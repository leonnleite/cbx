'use strict';

class CbxStep {
    constructor(image, size, position){
        this.background = '#000';
        this.setImage(image);
        this.setSize(size);
        this.setPosition(position);
    }

    setBackground(color){
        this.background = color;
    }

    setSize(size) {
        if (!size instanceof CbxSize) {
            throw 'Expected CbxSize Object in CbxStep[setSize]';
        }
        this.size = size;
    }

    /**
     *
     * @param CbxImage image
     */
    setImage(image) {
        if (!image instanceof CbxImage) {
            throw 'Expected CbxImage Object in CbxStep[setImage]';
        }
        this.image = image;
    }

    /**
     *
     * @returns CbxImage
     */
    getImage() {
        return this.image;
    }

    /**
     *
     * @returns CbxSize
     */
    getSize() {
        return this.size;
    }


    setPosition(position) {
        if (!position instanceof CbxPosition) {
            throw 'Expected CbxPosition Object in CbxStep[setPosition]';
        }
        this.position = position;
    }

    /**
     *
     * @returns CbxPosition
     */
    getPosition() {
        return this.position;
    }


}