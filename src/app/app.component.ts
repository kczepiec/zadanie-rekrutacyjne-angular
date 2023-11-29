import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavigationComponent } from './shared/components/common/Navigation/Navigation.component';
import { CryptoService } from './shared/services/Crypto.service';
import { loadCryptosSuccess } from './store/crypto/actions/crypto.actions';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'zadanie-rekrutacyjne-crypto';

  constructor(private cryptoService: CryptoService, private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
  }

  /**
   * Fetch crypto list.
   */
  fetchData() {
    this.cryptoService.getCryptoList().subscribe((res) => {
      this.store.dispatch(loadCryptosSuccess({ crypto: res }));
    });
  }
}
