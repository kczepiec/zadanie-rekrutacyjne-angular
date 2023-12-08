import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { environment } from '../../../environment/environment';
import * as fromRoot from '../index';

const version = environment.VERSION;
export const key = 'state[' + version + ']';

// Function to check if the code is running in a browser
function isPlatformBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const hydrationMetaReducer =
  (reducer: ActionReducer<fromRoot.State>): ActionReducer<fromRoot.State> =>
  (state, action) => {
    if (isPlatformBrowser()) {
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
    }

    const nextState = reducer(state, action);

    if (isPlatformBrowser()) {
      localStorage.setItem(key, JSON.stringify(nextState));
    }

    return nextState;
  };
