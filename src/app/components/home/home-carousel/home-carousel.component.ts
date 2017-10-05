import {
    Component,
    OnInit
} from '@angular/core';
  
import { ItemsDataService } from '../../../service/items-data.service';
import { SwiperModule } from 'angular2-useful-swiper';
  
@Component({
    selector: 'home-carousel',
    styleUrls: [ './home-carousel.component.css' ],
    templateUrl: './home-carousel.component.html'
})
export class HomeCarouselComponent implements OnInit {

    public numberOfSlides: number = 5;

    public randomImagesPerSlide: Array<number> = [];
    public totalSlideImages: number;

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
    ) {}
  
    public ngOnInit() {

        this.populateRandomImagesPerSlide();
        console.log(this.itemsData);
        console.log('A');
        console.log(this._itemsDataService.getAllImages());
      
    }

    private populateRandomImagesPerSlide() {
        this.totalSlideImages = 0;

        for (let i=0; i<this.numberOfSlides; i++) {
            let rand = Math.floor((Math.random() * 4) + 1);

            this.randomImagesPerSlide.push(rand);
            this.totalSlideImages += rand;
        }
    }

    private checkIsDataNotEmpty() {
        if (this.itemsData === undefined) {
            return true;
        }
    }
  
}
  