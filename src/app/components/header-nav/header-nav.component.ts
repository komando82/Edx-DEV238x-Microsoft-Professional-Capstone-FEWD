import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'header-nav',
  styleUrls: ['./header-nav.component.scss'],
  templateUrl: './header-nav.component.html'
})

export class HeaderNavComponent {

  constructor(public route: ActivatedRoute) {}

}
