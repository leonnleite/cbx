'use strict';

var Canvas = require('canvas')
let CbxSize = require('../Size/cbxSize.class');


module.exports =  class CbxImage extends Canvas.Image {
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