import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { BaseState } from './config';
import { reducer } from './crypto/reducers/crypto.reducer';
import { hydrationMetaReducer } from './reducers/hydration.reducer';


export interface State extends BaseState {}

export const appReducers: ActionReducerMap<Required<State>> = {
  crypto: reducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
