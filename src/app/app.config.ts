import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { cartReducer } from './state/cartState/cart.reducer';
import { provideHttpClient } from '@angular/common/http';
import { filterReducer } from './state/filterState/filter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideStore({
    cartState: cartReducer,
    filterState: filterReducer
  }),
  provideState({ name: 'cart', reducer: cartReducer }),
  provideState({ name: 'filter', reducer: filterReducer }),
  provideHttpClient(),
  ]
};
