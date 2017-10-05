import { Routes } from '@angular/router';
import { HomeComponent } from './components/home';
import { AboutComponent } from './about';
import { ContactComponent } from './components/contact';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: '**',    component: NoContentComponent },
];
