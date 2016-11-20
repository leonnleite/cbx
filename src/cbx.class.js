'use strict';

let CbxImage = require('./Image/cbxImage.class');
let CbxPosition = require('./Position/cbxPosition.class');
let CbxContainerSize = require('./Size/cbxContainerSize.class');
let CbxSize = require('./Size/cbxSize.class');
let CbxStep = require('./Step/cbxStep.class');

module.exports = class Cbx {
    constructor(json) {
        this.images = [];
        this.steps = [];

        if (!typeof json == 'object') {
            throw 'Cbx expected json object';
        }

        let addImage = (image) => {
            this.images.push(new CbxImage(image));
        }

        let addStep = (jsonStep) => {
            let image = this.images.find(image => {return image.uuid == jsonStep.image});
            let size = new CbxSize(jsonStep.size.width, jsonStep.size.height);
            let position = new CbxPosition(jsonStep.position.top, jsonStep.position.left);
            this.steps.push(new CbxStep(image, size, position));
        }

        json.images.forEach(addImage);
        json.steps.forEach(addStep);
        /**
         * @todo refactor
         */
        this.setContainerSize(new CbxContainerSize(100, 100));
        this.currentStep = this.steps[0];
        this.currentIndex = 0;
    }

    /**
     * @param CbxContainerSize
     */
    setContainerSize(containerSize) {
        if (!containerSize instanceof CbxContainerSize) {
            throw 'Expected CbxContainerSize Object in Cbx[setContainerSize]';
        }
        this.containerSize = containerSize;
    }

    /**
     *
     * @returns CbxContainerSize
     */
    getContainerSize() {
        return this.containerSize;
    }

    /**
     *
     * @returns CbxStep
     */
    getCurrentStep() {
        return this.currentStep;
    }

    nextStep() {
        this.currentIndex++;
        return this.currentStep = this.steps[this.currentIndex];
    }

    getBackgroundSize() {
        let imageRatio = this.currentStep.image.size.getRatio();
        let windowRatio = this.currentStep.size.getRatio();
        //step 2 = 1940/420
        return (imageRatio/windowRatio * 100) + '%';
    }

    getBackgroundPositionTop() {
        if (this.currentStep.position.top == 0) {
            return 0;
        }
    }

    getBackgroundPositionLeft() {
        if (this.currentStep.position.left == 0) {
            return 0;
        }
    }


    __isContainerWidthLowerThenStep() {
        return (this.containerSize.width < this.currentStep.size.width);
    }
    __isContainerHeightLowerThenStep() {
        return (this.containerSize.height < this.currentStep.size.height);
    }

    __getDimension() {
        if (!this.__isBothSizeLower()) {
            return;
        }
        if ((this.containerSize.width / this.currentStep.size.width) >
            (this.containerSize.height / this.currentStep.size.height)) {
            return 'height';
        }
        return 'width';
    }

    getBackgroundWidth() {
        let containerHeight = this.containerSize.height;
        let containerWidth = this.containerSize.width;
        let stepHeight = this.currentStep.size.height;
        let stepWidth = this.currentStep.size.width;


        if (containerWidth >= stepWidth && containerHeight >= stepHeight) {
            return stepWidth;
        }

        if (containerWidth < stepWidth && containerHeight < stepHeight) {
            let scaleWidth = containerWidth / stepWidth;
            let scaleHeight = containerHeight / stepHeight;
            if (scaleWidth <= scaleHeight) {
                return containerWidth;
            }
            return stepWidth * scaleHeight;
        }

        if (containerWidth >= stepWidth) { //so, height <=
            let scale = containerHeight / stepHeight;
            return scale * stepWidth;
        }

        return containerWidth;

    }

    _getBackgroundWidth() {

        if ((!this.__isContainerWidthLowerThenStep() && !this.__isContainerHeightLowerThenStep())) {
            return this.currentStep.width;
        }

        if (this.__isContainerWidthLowerThenStep()) {
            if (this.__isContainerHeightLowerThenStep()) {
                console.log('nem sei simular')
                if (this.containerSize.isPortrait()) {
                    console.log('foo');
                    if (this.currentStep.size.isPortrait()) {
                        console.log('bar');
                        return this.containerSize.width;
                    }
                    return this.containerSize.width;
                }
                if (this.currentStep.size.isLandscape()) {
                    console.log('baz');
                    return this.containerSize.width;
                }
                console.log('bux');
                return this.containerSize.height;
            }
            return this.containerSize.width;
        }
        return this.currentStep.size.width / (this.currentStep.size.height / this.containerSize.height);

        return ;
        if (this.containerSize.isPortrait()) {
            if (this.currentStep.size.isPortrait()) {
                return 1;
            }
            return 1;
        }

        return ;

        let dimension = this.__getDimension()
        if (dimension) {
            if (dimension == 'width') {
                return this.containerSize.width;
            }
            let heightScale = this.containerSize.height / this.currentStep.size.height;
            let width = this.currentStep.size.width * heightScale;
            if (width > this.containerSize.width) {
                return this.containerSize.width;
            }
            return width;
        }

        if (this.__isWidthSizeLower() && !this.__isHeightSizeLower()) {
            return this.currentStep.size.width;
        }

        if (!this.__isHeightSizeLower() && this.__isHeightSizeLower()) {
            return this.currentStep.size.width;
        }

    }

    getBackgroundHeight() {
        return this.getBackgroundWidth() / this.currentStep.size.getRatio();
    }



}