import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../service/cart.service';

@Component({
  selector: 'header-nav',
  styleUrls: ['./header-nav.component.scss'],
  templateUrl: './header-nav.component.html'
})

export class HeaderNavComponent implements OnInit {

  public cartProductIndexes: Array<any>;

  constructor(
    public route: ActivatedRoute,
    private _cartService: CartService
  ) {}

  public ngOnInit() {
    this.cartProductIndexes = this._cartService.getCartProductIndexes();
  }

}
