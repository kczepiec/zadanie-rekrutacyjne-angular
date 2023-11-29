import { createAction, props } from '@ngrx/store';
import { Crypto } from '../../../interfaces/Crypto.interface';

// Action to load cryptocurrencies
export const loadCryptos = createAction('[Crypto] Load Cryptos');

// Action to handle successful cryptocurrency loading
export const loadCryptosSuccess = createAction(
  '[Crypto] Load Cryptos Success',
  props<{ crypto: Crypto[] }>()
);

// Action to handle cryptocurrency loading failure
export const loadCryptosFailure = createAction(
  '[Crypto] Load Cryptos Failure',
  props<{ error: any }>()
);

// Action to add a cryptocurrency to favorites
export const addToFavorites = createAction(
  '[Crypto] Add to Favorites',
  props<{ crypto: Crypto }>()
);

export const addToFavoritesSuccess = createAction(
  '[Crypto] Add to Favorites Success',
  props<{ crypto: Crypto }>()
);

// Action to remove a cryptocurrency from favorites
export const removeFromFavorites = createAction(
  '[Crypto] Remove from Favorites',
  props<{ crypto: Crypto }>()
);
