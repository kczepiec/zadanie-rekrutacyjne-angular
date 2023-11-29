import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crypto } from '../../interfaces/Crypto.interface';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  /**
   * Returns the Crypto list.
   *
   * @returns An Observable of Crypto array representing the crypto list.
   */
  getCryptoList(): Observable<Crypto[]> {
    return this.http.get<Crypto[]>('assets/data/tickers.json');
  }

}
