// crypto.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { CryptoService } from '../../../shared/services/Crypto.service';
import * as CryptoActions from '../actions/crypto.actions';

@Injectable()
export class CryptoEffects {
  constructor(private actions$: Actions, private cryptoService: CryptoService) { }
  /**
   * Loads the crypto list.
   */
  loadCrypto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CryptoActions.loadCryptos),
      mergeMap(() =>
        this.cryptoService
          .getCryptoList()
          .pipe(map((response) => CryptoActions.loadCryptosSuccess({crypto: response}))),
      ),
      catchError((error) => of(error)),
    );
  });
  /**
   * Adds a crypto to the favorites list.
   * Returns a updated crypto list.
   */
  addToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CryptoActions.addToFavorites),
      mergeMap(({ crypto }) =>
        of(CryptoActions.addToFavoritesSuccess({ crypto })),
      ),
      catchError((error) => of(error)),
    );
  });
}
