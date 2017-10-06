import { Injectable } from '@angular/core';

@Injectable()
export class HomeSliderService {
    
    private numberOfSlides: number = 5;

    private randomImagesPerSlide: Array<number> = [];
    private totalImagesForSlides: number;

    constructor() {
        console.log('Hello from HomeSlider Service');
        this.generateRandomImagesPerSlide();
    }

    public getNumberOfSlides() {
        return this.numberOfSlides;
    }

    public getRandomImagesPerSlide() {
        return this.randomImagesPerSlide;
    }

    public getTotalImagesForSlides() {
        return this.totalImagesForSlides;
    }

    private generateRandomImagesPerSlide() {
        if (this.randomImagesPerSlide.length === 0) {
            this.totalImagesForSlides = 0;
            
            for (let i=0; i<this.numberOfSlides; i++) {
                let rand = Math.floor((Math.random() * 4) + 1);

                this.randomImagesPerSlide.push(rand);
                this.totalImagesForSlides += rand;
            }
        }
    }

}