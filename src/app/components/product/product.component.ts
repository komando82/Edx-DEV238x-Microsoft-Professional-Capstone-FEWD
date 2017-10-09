import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import { ItemsDataService } from '../../service/items-data.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'product',
  styleUrls: ['./product.component.css'],
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    public product:any;
    public productQty:number = 1;

    constructor(
      private _Activatedroute:ActivatedRoute,
      private _itemsDataService: ItemsDataService,
      private _productService: ProductService,
      private _router: Router,
      private _location: Location
    ){}

    public ngOnInit() {

      let id = parseInt(this._Activatedroute.snapshot.params['id']);

      if (isNaN(id)) {
        this._router.navigate(['/']);
      }

      this._itemsDataService.getItemsData()
          .subscribe((itemsData) => {
              let imagesArray = this._itemsDataService.getSlidesImages(itemsData);

              if (id < 0 || id >= imagesArray.length) {
                this._router.navigate(['/']);
              }

              this.product = this._productService.getProductFromImagesArray(imagesArray, id)
              console.log(this.product);
          });
      
    }

    public onBackButtonClick(event) {
      console.log('click Back');
      this._location.back();
    }

    public onAddProductToCartClick(event) {
      console.log('click Add');
    }

}
