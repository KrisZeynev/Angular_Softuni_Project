import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(StoreModule.forRoot({user: userReducer}))
  ]
};
