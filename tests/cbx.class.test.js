'use strict';
//var Cbx = require ('../src/cbx.class');
//var assert = require('assert');

// var assert = require('assert');
describe('Cbx', function() {
    describe('backgroundWidthAndHeight', () => {
        it('should subscribe variables', () => {
            console.log(assert);
            expect('1').toEqual(1);
        })
    });
    before('populate', () => {
        let myJson = require('./fixtures/data');
        this.cbx = new Cbx(myJson);
    });

    let resizeContainer = (width, height) => {
        this.cbx.getContainerSize().height = width;
        this.cbx.getContainerSize().width = height;
    };

    let resizeImagesize = (width, height) => {
        this.cbx.getCurrentStep().getSize().width = width;
        this.cbx.getCurrentStep().getSize().height = height;
    };

    describe('backgroundWidthAndHeight', () => {
        it('should subscribe variables', () => {
            resizeContainer(1000,1000);
            resizeImagesize(2000,2000);

            assert.equal(this.cbx.containerSize.height, 1000);
            assert.equal(this.cbx.containerSize.width, 1000);
            assert.equal(this.cbx.getCurrentStep().getSize().height, 2000);
            assert.equal(this.cbx.getCurrentStep().getSize().width, 2000);
        });

        it('should return 1000x1000 imageSize, when container 1000x1000 and image 2000x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(2000,2000);

            assert.equal(this.cbx.getBackgroundWidth(), 1000);
            assert.equal(this.cbx.getBackgroundHeight(), 1000);
        });

        it('should return 900x1000 imageSize, when container 1000x1000 and image 900x1000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(900,1000);

            assert.equal(this.cbx.getBackgroundWidth(), 900);
            assert.equal(this.cbx.getBackgroundHeight(), 1000);
        });
        it('should return 900x1000 imageSize, when container 1000x1000 and image 900x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(900,2000);

            assert.equal(this.cbx.getBackgroundWidth(), 450);
            assert.equal(this.cbx.getBackgroundHeight(), 1000);
        });

        it('should return 500x500 imageSize, when container 1000x1000 and image 500x500', () => {
            resizeContainer(1000,1000);
            resizeImagesize(500,500);

            assert.equal(this.cbx.getBackgroundWidth(), 500);
            assert.equal(this.cbx.getBackgroundHeight(), 500);
        });
        it('should return 250x1000 imageSize, when container 1000x1000 and image 500x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(500, 2000);

            assert.equal(this.cbx.getBackgroundWidth(), 250);
            assert.equal(this.cbx.getBackgroundHeight(), 1000);
        });

        it('should return 1000x1000 imageSize, when container 1000x1000 and image 2000x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(2000, 2000);

            assert.equal(this.cbx.getBackgroundWidth(), 1000);
            assert.equal(this.cbx.getBackgroundHeight(), 1000);
        });

        it('should return 1000x500 imageSize, when container 1000x1000 and image 3000x1500', () => {
            resizeContainer(1000,1000);
            resizeImagesize(3000, 1500);

            assert.equal(this.cbx.getBackgroundWidth(), 1000);
            assert.equal(this.cbx.getBackgroundHeight(), 500);
        });

        it('should return 500x1000 imageSize, when container 1000x1000 and image 1500x3000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(1500, 3000);

            assert.equal(this.cbx.getBackgroundWidth(), 500);
            assert.equal(this.cbx.getBackgroundHeight(), 1000);
        });

        it('should return 1000x500 imageSize, when container 1000x1000 and image 2000x1000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(2000,1000);

            assert.equal(this.cbx.getBackgroundWidth(), 1000);
            assert.equal(this.cbx.getBackgroundHeight(), 500);
        });
    });
});

//1 - carne com cebola
//2 - frango xadrez