'use strict';


class CbxImage extends Image {
    constructor(image) {
        super(image.size.width, image.size.height);
        this.size = new CbxSize(this.width, this.height);
        this.uuid = image.uuid;
        this.src = image.src;
    }

    /**
     *
     * @returns CbxSize
     */
    getSize() {
        return this.size;
    }
}