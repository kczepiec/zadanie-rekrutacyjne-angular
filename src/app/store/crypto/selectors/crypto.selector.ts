import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CryptoFavorites, CryptoState, cryptoFeatureKey } from '../config';

/**
 * Creates a feature selector for the Crypto state.
 */
export const selectCryptoSelector =
  createFeatureSelector<CryptoState>(cryptoFeatureKey);

/**
 * Returns the Crypto state.
 */
export const selectCryptoState = createSelector(
  selectCryptoSelector,
  (state) => state
);

/**
 * Returns the Crypto list.
 */
export const selectCryptoList = createSelector(
  selectCryptoSelector,
  (state) => state.items
);

/**
 * Selects a crypto by id.
 */
export const selectCryptoById = (cryptoId: string) =>
  createSelector(
    selectCryptoList,
    (items) => items.find((item) => item.id === cryptoId)
  );

/**
 * Returns the favorites list.
 */
export const selectFavorites = createSelector(
  selectCryptoSelector,
  (state) => state.favorites
);

/**
 * Checks if a crypto is in the favorites list.
 * This version of the selector takes the crypto id as an argument.
 */
export const isCryptoInFavorites = (cryptoId: string) =>
  createSelector(
    selectFavorites,
    (favorites: CryptoFavorites[] | undefined) => {
      return favorites ? favorites.some(favorite => favorite.crypto.id === cryptoId) : false;
    }
  );
