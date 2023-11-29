import { Crypto } from '../../interfaces/Crypto.interface';

/**
 * Represents the Crypto feature key.
 */
export const cryptoFeatureKey = 'crypto';

/**
 * Represents the Crypto state.
 */
export interface CryptoState {
  items: Crypto[];
  favorites: CryptoFavorites[];
  errorMessage: string | undefined;
}

/**
 * Represents a cryptocurrency with an id for favorites.
 */
export interface CryptoFavorites {
  crypto: Crypto;
  id: string;
}

/**
 * Initial state for the Crypto state.
 */
export const cryptoInitialState: CryptoState = {
  items: [],
  favorites: [],
  errorMessage: undefined,
};
