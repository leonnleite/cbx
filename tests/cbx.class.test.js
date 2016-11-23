'use strict';

describe('Cbx', function() {
    beforeEach(() => {
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

            expect(this.cbx.containerSize.height).toEqual(1000);
            expect(this.cbx.containerSize.width).toEqual(1000);
            expect(this.cbx.getCurrentStep().getSize().height).toEqual(2000);
            expect(this.cbx.getCurrentStep().getSize().width).toEqual(2000);
        });

        it('should return 1000x1000 imageSize, when container 1000x1000 and image 2000x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(2000,2000);

            expect(this.cbx.getBackgroundWidth()).toEqual(1000);
            expect(this.cbx.getBackgroundHeight()).toEqual(1000);
        });

        it('should return 900x1000 imageSize, when container 1000x1000 and image 900x1000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(900,1000);

            expect(this.cbx.getBackgroundWidth()).toEqual(900);
            expect(this.cbx.getBackgroundHeight()).toEqual(1000);
        });
        it('should return 900x1000 imageSize, when container 1000x1000 and image 900x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(900,2000);

            expect(this.cbx.getBackgroundWidth()).toEqual(450);
            expect(this.cbx.getBackgroundHeight()).toEqual(1000);
        });

        it('should return 500x500 imageSize, when container 1000x1000 and image 500x500', () => {
            resizeContainer(1000,1000);
            resizeImagesize(500,500);

            expect(this.cbx.getBackgroundWidth()).toEqual(500);
            expect(this.cbx.getBackgroundHeight()).toEqual(500);
        });
        it('should return 250x1000 imageSize, when container 1000x1000 and image 500x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(500, 2000);

            expect(this.cbx.getBackgroundWidth()).toEqual(250);
            expect(this.cbx.getBackgroundHeight()).toEqual(1000);
        });

        it('should return 1000x1000 imageSize, when container 1000x1000 and image 2000x2000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(2000, 2000);

            expect(this.cbx.getBackgroundWidth()).toEqual(1000);
            expect(this.cbx.getBackgroundHeight()).toEqual(1000);
        });

        it('should return 1000x500 imageSize, when container 1000x1000 and image 3000x1500', () => {
            resizeContainer(1000,1000);
            resizeImagesize(3000, 1500);

            expect(this.cbx.getBackgroundWidth()).toEqual(1000);
            expect(this.cbx.getBackgroundHeight()).toEqual(500);
        });

        it('should return 500x1000 imageSize, when container 1000x1000 and image 1500x3000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(1500, 3000);

            expect(this.cbx.getBackgroundWidth()).toEqual(500);
            expect(this.cbx.getBackgroundHeight()).toEqual(1000);
        });

        it('should return 1000x500 imageSize, when container 1000x1000 and image 2000x1000', () => {
            resizeContainer(1000,1000);
            resizeImagesize(2000,1000);

            expect(this.cbx.getBackgroundWidth()).toEqual(1000);
            expect(this.cbx.getBackgroundHeight()).toEqual(500);
        });
    });

    describe('backgroundTopAndLeft', () => {

    })

});

//1 - carne com cebola
//2 - frango xadrez