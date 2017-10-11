import { Component, OnInit, ViewChild } from '@angular/core';
  
import { ItemsDataService } from '../../../service/items-data.service';
import { HomeSliderService } from '../../../service/home-slider.service';

import { SwiperModule } from 'angular2-useful-swiper';
  
@Component({
    selector: 'home-carousel',
    styleUrls: [ 
        './home-carousel.component.scss', 
        './bootstrap-toggle.min.css',  
        './swiper.min.css'
    ],
    templateUrl: './home-carousel.component.html'
})
export class HomeCarouselComponent implements OnInit {

    @ViewChild('usefulSwiper') usefulSwiper: any;

    public randomImagesPerSlide: Array<number> = [];
    public randomImagesPerSlideHelper: Array<number> = [];

    public images: Array<any> = [];

    public toggleOnOff: boolean = true;

    public config: SwiperOptions = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplay: 1000,
        loop: true,
    };

    constructor(
        private _itemsDataService: ItemsDataService,
        private _homeSliderService: HomeSliderService
    ) {}
  
    public ngOnInit() {
        this.randomImagesPerSlide = this._homeSliderService.getRandomImagesPerSlide();
        this.randomImagesPerSlideHelper = this._homeSliderService.getRandomImagesPerSlideHelper();

        this._itemsDataService.getItemsData()
            .subscribe((itemsData) => {
                let imagesArray = this._itemsDataService.getImagesData(itemsData);
                this.images = this._homeSliderService.getRandomImages(imagesArray);
            });
    }

    public toggleOnOffClick(event) {
        this.toggleOnOff = !this.toggleOnOff;

        if(this.toggleOnOff) {
            this.usefulSwiper.swiper.startAutoplay();
        }
        else {
            this.usefulSwiper.swiper.stopAutoplay();
        }
    }

    public prevNextClick(event) {
        if(this.toggleOnOff) {
            this.toggleOnOff = !this.toggleOnOff;
        }
    }

}
  