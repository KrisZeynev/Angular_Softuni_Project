import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';

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
    path: 'details/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/book-details-page/book-details-page').then(c => c.BookDetailsPage)
  },
  {
    path: 'add-new-book',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/add-new-book/add-new-book').then((c) => c.AddNewBook),
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/favorites-page/favorites-page').then(
        (c) => c.FavoritesPage
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
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile-page/profile-page').then((c) => c.ProfilePage),
  },
  {
    path: 'logout',
    // canActivate: [authGuard],
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', component: NotFound },
];
