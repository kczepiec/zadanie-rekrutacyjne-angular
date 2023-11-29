import { Action, createReducer, on } from '@ngrx/store';
import * as CryptoActions from '../actions/crypto.actions';
import { CryptoState, cryptoInitialState } from '../config';

const cryptoReducer = createReducer(
  cryptoInitialState,
  on(CryptoActions.loadCryptosSuccess, (state, { crypto }) => {
    return {
      ...state,
      items: crypto,
    }
  }),
  on(CryptoActions.loadCryptosFailure, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
    }
  }),
  on(CryptoActions.addToFavoritesSuccess, (state, { crypto }) => {
    return {
      ...state,
      favorites: [...state.favorites, { crypto, id: crypto.id }],
    }
  }),
  on(CryptoActions.removeFromFavorites, (state, { crypto }) => {
    return {
      ...state,
      favorites: state.favorites.filter((favorite) => favorite.crypto.id !== crypto.id),
    }
  }),
);

export function reducer(state: CryptoState | undefined, action: Action) {
  return cryptoReducer(state, action);
}
