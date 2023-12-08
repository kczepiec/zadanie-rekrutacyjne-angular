import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { BaseState } from './config';
import { cryptoReducer } from './crypto/reducers/crypto.reducer';
import { hydrationMetaReducer } from './reducers/hydration.reducer';


export interface State extends BaseState {}

export const appReducers: ActionReducerMap<Required<State>> = {
  crypto: cryptoReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
