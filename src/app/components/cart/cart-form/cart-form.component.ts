import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { ItemsDataService } from '../../../service/items-data.service';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'cart-form',
  styleUrls: ['./cart-form.component.scss'],
  templateUrl: './cart-form.component.html'
})
export class CartFormComponent {
  public form: FormGroup;

  public name: string;
  public address: string;
  public city: string;
  public phone: string;

  @Input() public validQty: boolean;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.form = fb.group({
      nameControl: ['', Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      addressControl: ['', Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      cityControl: ['', Validators.compose(
        [Validators.required]
      )],
      phoneControl: ['', Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )],
    });
  }

  private validation() {
    if (!this.name || this.name === '') {
        return false;
    }
    if (!this.address || this.address === '') {
        return false;
    }
    if (!this.city || this.city === '') {
        return false;
    }
    if (!this.phone || this.phone === '') {
        return false;
    }

    return true;
  }

}
