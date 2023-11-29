import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import data from '../../../assets/data/tickers.json';
import { Crypto } from '../../interfaces/Crypto.interface';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  /**
   * Returns the Crypto list.
   *
   * @returns An Observable of Crypto array representing the crypto list.
   */
  getCryptoList(): Observable<Crypto[]> {
    return of(data);
  }

}
