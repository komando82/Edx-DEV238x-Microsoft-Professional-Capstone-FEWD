import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import { ItemsDataService } from '../../service/items-data.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    public product: any;
    public productQty: number = 1;

    protected id: number;

    constructor(
      private _Activatedroute:ActivatedRoute,
      private _itemsDataService: ItemsDataService,
      private _router: Router,
      private _location: Location,
      private _cartService: CartService
    ){}

    public ngOnInit() {
      this.id = parseInt(this._Activatedroute.snapshot.params['id']);

      if (isNaN(this.id)) {
        this._router.navigate(['/']);
      }

      this._itemsDataService.getItemsData()
          .subscribe((itemsData) => {
              let imagesArray = this._itemsDataService.getImagesData(itemsData);

              if (this.id < 0 || this.id >= imagesArray.length) {
                this._router.navigate(['/']);
              }

              this.product = imagesArray[this.id];
          });
    }

    public onBackButtonClick(event) {
      this._location.back();
    }

    public onAddProductToCartClick(event) {
      this._cartService.addCartProductIndexes(this.id, this.productQty);
    }

}
