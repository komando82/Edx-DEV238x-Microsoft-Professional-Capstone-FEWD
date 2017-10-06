import {
    Component,
    OnInit
} from '@angular/core';
  
import { ItemsDataService } from '../../../service/items-data.service';
import { HomeSliderService } from '../../../service/home-slider.service';

import { SwiperModule } from 'angular2-useful-swiper';
  
@Component({
    selector: 'home-carousel',
    styleUrls: [ './home-carousel.component.css' ],
    templateUrl: './home-carousel.component.html'
})
export class HomeCarouselComponent implements OnInit {

    public numberOfSlides: number;
    
    public randomImagesPerSlide: Array<number> = [];
    public totalImagesForSlides: number;

    public itemsData: any;
    public images: any;

    public config: SwiperOptions = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplay: 1000
    };

    constructor(
        private _itemsDataService: ItemsDataService,
        private _homeSliderService: HomeSliderService
    ) {}
  
    public ngOnInit() {

        this.numberOfSlides = this._homeSliderService.getNumberOfSlides();
        this.randomImagesPerSlide = this._homeSliderService.getRandomImagesPerSlide();
        this.totalImagesForSlides = this._homeSliderService.getTotalImagesForSlides();

        console.log(this._homeSliderService.getRandomImagesPerSlide());

        this._itemsDataService.getItemsData()
            .subscribe((itemsData) => {
                this.itemsData = itemsData;
                console.log(this.itemsData);
                console.log('Yup');

                console.log(this._itemsDataService.getAllImageItems(this.itemsData));
            });
      
    }

}
  