import { Routes } from '@angular/router';
import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import { ContactComponent } from './components/contact';
import { ProductComponent } from './components/product';
import { ShopAllComponent } from './components/shop-all';
import { CartComponent } from './components/cart';
import { NoContentComponent } from './components/no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'shopping', component: ShopAllComponent },
  { path: 'cart', component: CartComponent },
  { path: '**',    component: NoContentComponent },
];
