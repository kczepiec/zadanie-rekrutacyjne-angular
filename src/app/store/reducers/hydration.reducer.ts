'use client';

import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { environment } from '../../../environment/environment';
import * as fromRoot from '../index';

const version = environment.VERSION;
export const key = 'state[' + version + ']';

const storeUpdateCounter = () => {
  const dateKey = key + '[counter]';
  let newValue = 1;

  const storageValue = localStorage.getItem(dateKey);
  if (storageValue) {
    try {
      const parsed: number = JSON.parse(storageValue);
      newValue = Number(parsed) + 1;
    } catch {
      localStorage.removeItem(dateKey);
    }
  }

  localStorage.setItem(dateKey, newValue.toString());
};

const storeUpdateDates = (limit: number) => {
  const dateKey = key + '[updates]';
  let newValue: string[] = [new Date().toISOString()];

  const storageValue = localStorage.getItem(dateKey);
  if (storageValue) {
    try {
      const parsed: string[] = JSON.parse(storageValue);
      newValue = [...newValue, ...parsed.filter((_, index) => index < limit)];
    } catch {
      localStorage.removeItem(dateKey);
    }
  }

  localStorage.setItem(dateKey, JSON.stringify(newValue));
};

export const hydrationMetaReducer =
  (reducer: ActionReducer<fromRoot.State>): ActionReducer<fromRoot.State> =>
  (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem(key);
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          console.log(`JSON parsing problem. LocalStorage (${key}) was not read correctly`);
          localStorage.removeItem(key);
        }
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem(key, JSON.stringify(nextState));

    storeUpdateDates(10);
    storeUpdateCounter();

    return nextState;
  };
