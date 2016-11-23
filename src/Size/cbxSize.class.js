'use strict';

class CbxSize {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getRatio() {
        return this.width / this.height;
    }

    isLandscape() {
        return this.width > this.height;
    }
    isPortrait() {
        return !this.isLandscape();
    }

};
