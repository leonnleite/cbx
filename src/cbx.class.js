'use strict';

class Cbx {
    constructor(json) {
        this.images = [];
        this.steps = [];
        this.countImagesLoaded = 0;

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
        this.setContainerSize(new CbxWindowSize());
        this.currentStep = this.steps[0];
        this.currentIndex = 0;
        this.initEvents();
    }

    /**
     * @new
     */
    initEvents() {
        let imageEvent = () => {
            this.images.forEach((image) => {
                image.onload = () => {
                    let event = new Event('loadedCbxImage');
                    event.image = image;
                    this.containerSize.element.dispatchEvent(event)
                }
            })
        };

        this.containerSize.element.addEventListener('loadedCbxImage', (event) => {
            this.countImagesLoaded++;
            if (this.countImagesLoaded == this.images.length) {
                this.containerSize.element.dispatchEvent(new Event('finishCbxImage'))
            }
        });

        imageEvent();
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
        let width = this.getBackgroundWidth();
        let cropWidth = this.currentStep.getSize().width;
        let originalWidth = this.currentStep.getImage().getSize().width;
        return originalWidth / cropWidth * width;
        //step 2 = 1940/420
        //1940/1400*578,7

    }

    getBackgroundPositionTop() {
        let top = this.getBackgroundHeight() / this.currentStep.getSize().height;
        top *= this.currentStep.getPosition().top;
        top *= -1;
        return top;
    }

    getBackgroundPositionLeft() {
        let width = this.getBackgroundWidth()
        let stepWidth = this.currentStep.getSize().width;
        let left = width / stepWidth;
        left *= this.currentStep.getPosition().left;
        left *= -1;
        return left;
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

    getBackgroundHeight() {
        return this.getBackgroundWidth() / this.currentStep.size.getRatio();
    }

}