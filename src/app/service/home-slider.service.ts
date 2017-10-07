import { Injectable } from '@angular/core';

@Injectable()
export class HomeSliderService {
    
    private numberOfSlides: number = 5;

    private randomImagesPerSlide: Array<number> = [];
    private randomImagesPerSlideHelper: Array<number> = [];
    private totalImagesForSlides: number;

    private imagesArray = [];
    private randomImagesIndexes = [];
    private slidesImages = [];

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

    public collectRandomImages(itemsData) {
        if (this.slidesImages.length !== 0) {
            return this.slidesImages;
        }

        if (this.imagesArray.length === 0) {
            this.imagesArray = this.getAllImageItems(itemsData);
        }

        if (this.randomImagesIndexes.length === 0) {
            this.randomImagesIndexes = this.getRandomImagesIndexes(this.imagesArray.length, this.totalImagesForSlides);
        }

        this.slidesImages = this.getRandomImages(this.randomImagesIndexes, this.imagesArray);

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

    private getAllImageItems(itemsData) {
        let allImages = [];
        
        for (let item in itemsData) {
            let subcategories = itemsData[item].subcategories;

            for (let subcategorie in subcategories) {
                let items = subcategories[subcategorie].items;

                for (let item in items) {
                    allImages.push(items[item]);
                }
            }
        }

        return allImages;
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