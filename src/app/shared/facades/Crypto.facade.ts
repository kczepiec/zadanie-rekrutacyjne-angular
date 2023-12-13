import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Crypto } from '../../interfaces/Crypto.interface';
import { addToFavorites, loadCryptos, removeFromFavorites } from '../../store/crypto/actions/crypto.actions';
import { CryptoState } from '../../store/crypto/config';
import { selectCryptoList } from '../../store/crypto/selectors/crypto.selector';
import { CryptoService } from '../services/Crypto.service';

@Injectable({
  providedIn: 'root',
})
export class CryptoFacade {
  constructor(private readonly store: Store<CryptoState>, private readonly cryptoService: CryptoService) {}

  /**
   * Fetching crypto list.
   *
   * @returns An Observable of Crypto array representing the crypto list.
   */
  fetchCryptoList() {
    return this.store.dispatch(loadCryptos());
  }

  /**
   * Geting crypto list.
   *
   * @returns An Observable of Crypto array representing the crypto list.
   */
  getCryptoList() {
    return this.store.select(selectCryptoList);
  }

  /**
   * Adds a crypto to the favorites list.
   *
   * @param crypto The crypto to add to the favorites list.
   */
  addToFavorites(crypto: Crypto) {
    return this.store.dispatch(addToFavorites({ crypto }))
  }

  /**
   * Removes a crypto from the favorites list.
   *
   * @param crypto The crypto to remove from the favorites list.
   */
  removeFromFavorites(cryptoId: string) {
    return this.store.dispatch(removeFromFavorites({ cryptoId }));
  }
}
