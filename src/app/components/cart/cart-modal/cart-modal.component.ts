import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'cart-modal',
  styleUrls: ['./cart-modal.component.scss'],
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent {
  @Input() public name: string;
  @Input() public address: string;
  @Input() public city: string;
  @Input() public phone: string;

  @Input() public subTotal: number;
  @Input() public tax: number;

  @Input() public openModal: boolean;

  @Output() public onCloseModal = new EventEmitter();

  public closeModalClick(event) {
    event.stopPropagation();
    this.onCloseModal.emit(true);
  }

  public doNothing(event) {
    event.stopPropagation();
  }
}
