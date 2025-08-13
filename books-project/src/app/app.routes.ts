import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

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
    path: 'book-details/:id',
    loadComponent: () =>
      import('./pages/book-details-page/book-details-page').then(c => c.BookDetailsPage)
  },
  {
    path: 'create-comment/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/comments/comment-create-form/comment-create-form').then(c => c.CommentCreateForm)
  },
  {
    path: 'edit-comment/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/comments/comment-edit-form/comment-edit-form').then(c => c.CommentEditForm)
  },
  {
    path: 'edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/edit-page/edit-page').then(c => c.EditPage)
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
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./pages/login-page/login-page').then((c) => c.LoginPage),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
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
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', component: NotFound },
];
