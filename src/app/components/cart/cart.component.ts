import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ItemsDataService } from '../../service/items-data.service';
import { CartService } from '../../service/cart.service';

import { CartFormComponent } from './cart-form';
import { CartModalComponent } from './cart-modal';

@Component({
  selector: 'cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  public cartProductArray: any[] = [];
  public imagesData: any[] = [];

  public subTotal: number = 0;
  public tax: number = 0.1;

  public validQty: boolean = true;

  public name: string = '';
  public address: string = '';
  public city: string = '';
  public phone: string = '';

  public resetForm: boolean = false;
  public openModal: boolean = false;

  constructor(
    private _itemsDataService: ItemsDataService,
    private _cartService: CartService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

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

  public onProductQtyChange (inputProductId, inputProductQty) {

    if (inputProductQty > 0) {
      this._cartService.setQtyForProductId(
        parseInt(inputProductId, 10),
        parseInt(inputProductQty, 10)
      );
    }

    if (!this.validateQtyInputs()) {
      this.validQty = false;
    } else {
      this.validQty = true;
    }
  }

  public onRemoveCartItemClick(event, productIndex) {
    let removeCartProductIndex = this.cartProductArray[productIndex].productId;

    this.cartProductArray.splice(productIndex, 1);
    this._cartService.removeProductFromCart(removeCartProductIndex);

    if (!this.validateQtyInputs()) {
      this.validQty = false;
    } else {
      this.validQty = true;
    }
  }

  public getSubTotal(): number {
    let subtotal = 0;

    for (let i of Object.keys(this.cartProductArray)) {
      let index = this.cartProductArray[i].productId;

      subtotal += this.imagesData[index].price * this.cartProductArray[i].productQty;
    }

    this.subTotal = subtotal;

    return subtotal;
  }

  public onCheckoutForm(emitData) {
    this.openModal = true;

    this.name = emitData.name;
    this.address = emitData.address;
    this.city = emitData.city;
    this.phone = emitData.phone;

    this.renderer.addClass(document.body, 'modal-open');
  }

  public onCloseModal(emitData) {
    this.resetForm = emitData;
    this.openModal = false;

    this.renderer.removeClass(document.body, 'modal-open');

    this._cartService.resetCartData(this.cartProductArray);
    this.cartProductArray = [];
  }

  private parseProductArrayData(cartProductIndexes, cartProductQuantities) {
    let cartProductArray = [];

    for (let i of Object.keys(cartProductIndexes)) {
      cartProductArray.push({
        productId: cartProductIndexes[i],
        productQty: cartProductQuantities[i]
      });
    }

    return cartProductArray;
  }

  private validateQtyInputs() {
    for (let i of Object.keys(this.cartProductArray)) {
      let index = this.cartProductArray[i].productId;

      if (this.cartProductArray[i].productQty < 1) {
        return false;
      }
    }

    return true;
  }

}
