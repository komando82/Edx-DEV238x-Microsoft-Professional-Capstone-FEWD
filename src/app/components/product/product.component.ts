import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import { ItemsDataService } from '../../service/items-data.service';

@Component({
  selector: 'product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    public product: any;
    public productQty: number = 1;

    constructor(
      private _Activatedroute:ActivatedRoute,
      private _itemsDataService: ItemsDataService,
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
              let imagesArray = this._itemsDataService.getImagesData(itemsData);

              if (id < 0 || id >= imagesArray.length) {
                this._router.navigate(['/']);
              }

              this.product = imagesArray[id];
          });
    }

    public onBackButtonClick(event) {
      this._location.back();
    }

    public onAddProductToCartClick(event) {
      console.log('click Add');
    }

}
