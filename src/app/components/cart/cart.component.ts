import { Component, OnInit } from '@angular/core';

import { ItemsDataService } from '../../service/items-data.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  public cartProductIndexes: Array<any> = [];
  public cartProductQuantities: Array<any> = [];

  public imagesData: Array<any> = [];

  constructor(
    private _itemsDataService: ItemsDataService,
    private _cartService: CartService
  ){}

  public ngOnInit() {
    this._itemsDataService.getItemsData()
        .subscribe((itemsData) => {
          this.imagesData = this._itemsDataService.getImagesData(itemsData);

          this.cartProductIndexes = this._cartService.getCartProductIndexes();
          this.cartProductQuantities = this._cartService.getCartProductQuantities();

          console.log(this.cartProductIndexes);
          console.log(this.cartProductQuantities);
        });
  }

  public onRemoveCartItemClick(event, productIndex) {
    console.log(productIndex);
  }

  public onChangeCartItemQty(inpValue, productIndex) {
    console.log(inpValue);
    console.log(productIndex);
  }

}
