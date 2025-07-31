import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page').then((c) => c.HomePage),
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./pages/catalog-page/catalog-page').then((c) => c.CatalogPage),
  },
//   {
//     path: 'preferences',
//     loadComponent: () =>
//       import('./pages/'),
//   },
  { path: '**', component: NotFound },
];
