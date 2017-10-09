import { Injectable } from '@angular/core';

@Injectable()
export class HomeSliderService {
    
    private numberOfSlides: number = 5;

    private randomImagesPerSlide: Array<number> = [];
    private randomImagesPerSlideHelper: Array<number> = [];
    private totalImagesForSlides: number;

    private randomImagesIndexes: Array<number>  = [];
    private slidesImages: Array<any>  = [];

    constructor() {
        this.generateRandomImagesPerSlide();

        console.log(this.randomImagesPerSlide);
        console.log(this.randomImagesPerSlideHelper);
    }

    public getNumberOfSlides() {
        return this.numberOfSlides;
    }

    public getRandomImagesPerSlide() {
        return this.randomImagesPerSlide;
    }

    public getRandomImagesPerSlideHelper() {
        return this.randomImagesPerSlideHelper;
    }

    public getTotalImagesForSlides() {
        return this.totalImagesForSlides;
    }

    public getRandomImagesIndexesProp() {
        return this.randomImagesIndexes;
    }

    public collectRandomImages(imagesArray) {
        if (this.slidesImages.length !== 0) {
            return this.slidesImages;
        }

        if (this.randomImagesIndexes.length === 0) {
            this.randomImagesIndexes = this.getRandomImagesIndexes(imagesArray.length, this.totalImagesForSlides);
        }

        this.slidesImages = this.getRandomImages(this.randomImagesIndexes, imagesArray);

        return this.slidesImages;
    }

    private generateRandomImagesPerSlide() {
        if (this.randomImagesPerSlide.length === 0) {
            this.totalImagesForSlides = 0;
            
            for (let i=0; i<this.numberOfSlides; i++) {
                this.randomImagesPerSlideHelper.push(this.totalImagesForSlides);

                let rand = Math.floor((Math.random() * 4) + 1);

                this.randomImagesPerSlide.push(rand);

                this.totalImagesForSlides += rand;
            }
        }
    }

    private getRandomImagesIndexes(imagesArrayLength, requiredImagesNum) {
        let randomImagesIndexes = [];

        while(randomImagesIndexes.length < requiredImagesNum) {
            let rand = Math.floor((Math.random() * imagesArrayLength));

            if (randomImagesIndexes.indexOf(rand) === -1) {
                randomImagesIndexes.push(rand);
            }
        }
        
        return randomImagesIndexes;
    }

    private getRandomImages(randomImagesIndexArray, imagesArray) {
        let slidesImages = [];

        for (let index in randomImagesIndexArray) {
            slidesImages.push(imagesArray[randomImagesIndexArray[index]]);
        }

        return slidesImages;
    }

}