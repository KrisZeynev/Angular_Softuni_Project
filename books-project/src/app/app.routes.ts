import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //   { path: 'home', loadComponent: () =>('').then(c=> c.home) },
  { path: '**', component: NotFound },
];
