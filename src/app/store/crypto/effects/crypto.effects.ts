// crypto.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { CryptoService } from '../../../shared/services/Crypto.service';
import * as CryptoActions from '../actions/crypto.actions';
import { selectCryptoList } from '../selectors/crypto.selector';

@Injectable()
export class CryptoEffects {
  constructor(
    private actions$: Actions,
    private cryptoService: CryptoService,
    private store: Store
  ) {}

  /**
   * Loads the crypto list.
   */
  loadCrypto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      withLatestFrom(this.store.select(selectCryptoList)),
      switchMap(([_, cryptos]) => {
        if (cryptos.length === 0) {
          return this._loadCryptosFromService();
        }
        return EMPTY;
      }),
      catchError(this._handleError)
    )
  );

  /* Load cryptocurrencies from API (JSON) */
  private _loadCryptosFromService() {
    return this.cryptoService
      .getCryptoList()
      .pipe(
        map((response) =>
          CryptoActions.loadCryptosSuccess({ crypto: response })
        )
      );
  }

  /* Handle error */
  private _handleError(error: any) {
    console.error('Error in crypto effect:', error);
    return of(CryptoActions.loadCryptosFailure({ error }));
  }

  /**
   * Adds a crypto to the favorites list.
   * Returns a updated crypto list.
   */
  addToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CryptoActions.addToFavorites),
      switchMap(({ crypto }) =>
        of(CryptoActions.addToFavoritesSuccess({ crypto }))
      ),
      catchError((error) => of(error))
    );
  });

  /**
   * Removes a crypto from the favorites list.
   * Returns a updated crypto list.
   */
  removeFromFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CryptoActions.removeFromFavorites),
      switchMap(({ cryptoId }) =>
        of(CryptoActions.removeFromFavoritesSuccess({ cryptoId }))
      ),
      catchError((error) => of(error))
    );
  });
}
