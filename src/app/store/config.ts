import { RouterState } from '@ngrx/router-store';
import { CryptoState } from './crypto/config';

export interface BaseState {
  crypto?: CryptoState;
  router: RouterState
}
