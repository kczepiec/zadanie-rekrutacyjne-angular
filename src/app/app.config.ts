import { ApplicationConfig, PLATFORM_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environment/environment';
import { routes } from './app.routes';
import { appReducers, metaReducers } from './store';
import { CryptoEffects } from './store/crypto/effects/crypto.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(appReducers, { metaReducers: isPlatformBrowser(PLATFORM_ID) ? metaReducers : [] }),
    importProvidersFrom(EffectsModule.forRoot([EffectsModule])),
    provideEffects([CryptoEffects]),
    provideHttpClient(withFetch()),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
};
