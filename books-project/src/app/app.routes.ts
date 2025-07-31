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
  {
    path: ':id/details',
    loadComponent: () =>
      import('./pages/book-details-page/book-details-page').then(c => c.BookDetailsPage)
  },
  {
    path: 'add-new-book',
    loadComponent: () =>
      import('./pages/add-new-book/add-new-book').then((c) => c.AddNewBook),
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./pages/preferences-page/preferences-page').then(
        (c) => c.PreferencesPage
      ),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-page/about-page').then((c) => c.AboutPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page').then((c) => c.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page').then((c) => c.RegisterPage),
  },
  {
    path: 'logout',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', component: NotFound },
];
