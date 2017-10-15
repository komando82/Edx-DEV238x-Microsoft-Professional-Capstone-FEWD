import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ItemsDataService } from '../../service/items-data.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  public cartProductArray: Array<any> = [];

  public imagesData: Array<any> = [];

  public subTotal: number = 0;
  public tax: number = 0.1;

  public validQty:boolean = true;

  constructor(
    private _itemsDataService: ItemsDataService,
    private _cartService: CartService,
    private cdRef: ChangeDetectorRef
  ){}

  public ngOnInit() {
    this._itemsDataService.getItemsData()
        .subscribe((itemsData) => {
          this.imagesData = this._itemsDataService.getImagesData(itemsData);

          this.cartProductArray = this.parseProductArrayData(
            this._cartService.getCartProductIndexes(),
            this._cartService.getCartProductQuantities()
          );
        });
  }

  public onProductQtyChange(inputProductId, inputProductQty){

    if (inputProductQty > 0) {
      this._cartService.setQtyForProductId(parseInt(inputProductId), parseInt(inputProductQty));
    }

    if(!this.validateQtyInputs()) {
      this.validQty = false;
    }
    else {
      this.validQty = true;
    }
  }

  public onRemoveCartItemClick(event, productIndex) {
    let removeCartProductIndex = this.cartProductArray[productIndex].productId;

    this.cartProductArray.splice(productIndex,1);
    this._cartService.removeProductFromCart(removeCartProductIndex);

    if(!this.validateQtyInputs()) {
      this.validQty = false;
    }
    else {
      this.validQty = true;
    }
  }

  public getSubTotal():number{
    let subtotal = 0;

    for (let i in this.cartProductArray) {
      let index = this.cartProductArray[i].productId;

      subtotal += this.imagesData[index].price * this.cartProductArray[i].productQty;
    }

    this.subTotal = subtotal;

    return subtotal;
  }

  private parseProductArrayData(cartProductIndexes, cartProductQuantities) {
    let cartProductArray = [];

    for (let i in cartProductIndexes) {
      cartProductArray.push({
        productId: cartProductIndexes[i],
        productQty: cartProductQuantities[i]
      });
    }

    return cartProductArray;
  }

  private validateQtyInputs() {
    for (let i in this.cartProductArray) {
      let index = this.cartProductArray[i].productId;

      if (this.cartProductArray[i].productQty < 1) {
        return false;
      }
    }

    return true;
  }

}
