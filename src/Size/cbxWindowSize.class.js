'use strict';

class CbxWindowSize extends CbxContainerSize {
    constructor() {
        let maxWindowWithScala = 0.95;
        let maxWindowHeightScala = 0.9;
        let width = window.innerWidth * maxWindowWithScala;
        let height = window.innerHeight * maxWindowHeightScala;
        super(width, height, window);
        this.element = window;
    }
}
