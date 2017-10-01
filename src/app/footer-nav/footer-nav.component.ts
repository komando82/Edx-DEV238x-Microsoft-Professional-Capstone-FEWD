import {
  Component
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'footer-nav',
  styleUrls: ['./footer-nav.component.css'],
  templateUrl: './footer-nav.component.html'
})

export class FooterNavComponent {

  constructor(
    public route: ActivatedRoute
  ) {}

}
