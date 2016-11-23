'use strict';

class CbxContainerSize extends CbxSize {
    constructor(width, height, element) {
        super(width, height);
        this.element = element;
    }
}