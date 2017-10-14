import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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

  public cartProductArray: Array<any> = [];

  public imagesData: Array<any> = [];

  public subTotal: number = 0;
  public tax: number = 0.1;

  public element:number = 1;

  constructor(
    private _itemsDataService: ItemsDataService,
    private _cartService: CartService,
    private cdRef: ChangeDetectorRef
  ){}

  public ngOnInit() {
    this._itemsDataService.getItemsData()
        .subscribe((itemsData) => {
          this.imagesData = this._itemsDataService.getImagesData(itemsData);

          this.cartProductIndexes = this._cartService.getCartProductIndexes();
          this.cartProductQuantities = this._cartService.getCartProductQuantities();

          this.cartProductArray = this.parseProductArrayData(
            this._cartService.getCartProductIndexes(),
            this._cartService.getCartProductQuantities()
          );

          console.log(this.cartProductArray);
        });
  }

  public onChange(event){

    this._cartService.setQty();

    if (parseInt(event) < 1) {
      console.log('b');
      this.element = 1; 
    }
    else {
      this.element = parseInt(event);
    }
    console.log(event);

  }

  public onRemoveCartItemClick(event, productIndex) {
    console.log(productIndex);
    //this.cartProductIndexes.splice(productIndex,1);
    //this.cartProductQuantities.splice(productIndex,1);
    //console.log(this.cartProductIndexes);
    //console.log(this.cartProductQuantities);
    let removeCartProductIndex = this.cartProductArray[productIndex].productId;
    console.log(removeCartProductIndex);

    this.cartProductArray.splice(productIndex,1);
    this._cartService.removeProductFromCart(removeCartProductIndex);
  }

  public getSubTotal():number{
    /*console.log('start');
    console.log(this.cartProductIndexes);
    console.log(this.cartProductQuantities);
    console.log('end');*/
    let subtotal = 0;

    for (let i in this.cartProductArray) {
      let index = this.cartProductArray[i].productId;

      subtotal += this.imagesData[index].price * this.cartProductArray[i].productQty;
    }

    /*for (let i=0; i<this.cartProductIndexes.length; i++) {
      let index = this.cartProductIndexes[i];

      subtotal += this.imagesData[index].price * this.cartProductQuantities[index];
      console.log('a');
      console.log(this.imagesData[index].price);
      console.log(this.cartProductQuantities[index]);
    }*/

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

}
