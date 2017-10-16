import { Injectable } from '@angular/core';

@Injectable()
export class HomeSliderService {

    private numberOfSlides: number = 5;

    private randomImagesPerSlide: number[] = [];
    private randomImagesPerSlideHelper: number[] = [];
    private totalSlidesImages: number;

    private randomImagesIndexes: number[] = [];
    private slidesImages: any[]  = [];

    constructor() {
        this.generateRandomImagesPerSlide();
    }

    public getRandomImagesPerSlide() {
        return this.randomImagesPerSlide;
    }

    public getRandomImagesPerSlideHelper() {
        return this.randomImagesPerSlideHelper;
    }

    public getRandomImages(imagesArray) {
        if (this.slidesImages.length !== 0) {
            return this.slidesImages;
        }

        if (this.randomImagesIndexes.length === 0) {
            this.randomImagesIndexes = this.collectRandomImagesIndexes(
                imagesArray.length,
                this.totalSlidesImages
            );
        }

        this.slidesImages = this.collectRandomImages(this.randomImagesIndexes, imagesArray);

        return this.slidesImages;
    }

    private generateRandomImagesPerSlide() {
        if (this.randomImagesPerSlide.length === 0) {
            this.totalSlidesImages = 0;

            for (let i = 0; i < this.numberOfSlides; i++) {
                this.randomImagesPerSlideHelper.push(this.totalSlidesImages);

                let rand = Math.floor((Math.random() * 4) + 1);

                this.randomImagesPerSlide.push(rand);

                this.totalSlidesImages += rand;
            }
        }
    }

    private collectRandomImagesIndexes(imagesArrayLength, requiredImagesNum) {
        let randomImagesIndexes = [];

        while (randomImagesIndexes.length < requiredImagesNum) {
            let rand = Math.floor((Math.random() * imagesArrayLength));

            if (randomImagesIndexes.indexOf(rand) === -1) {
                randomImagesIndexes.push(rand);
            }
        }

        return randomImagesIndexes;
    }

    private collectRandomImages(randomImagesIndexArray, imagesArray) {
        let slidesImages = [];

        for (let index of Object.keys(randomImagesIndexArray)) {
            slidesImages.push(imagesArray[randomImagesIndexArray[index]]);
        }

        return slidesImages;
    }

}
