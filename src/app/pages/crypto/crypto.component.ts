import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Crypto } from '../../interfaces/Crypto.interface';
import { FavoriteButtonComponent } from '../../shared/components/common/FavoriteButton/FavoriteButton.component';
import { StatsBoxComponent } from '../../shared/components/common/StatsBox/StatsBox.component';
import { DateFormatPipe } from '../../shared/pipes/DateFormat.pipe';
import { TruncatePricePipe } from '../../shared/pipes/TruncatePrice.pipe';
import { selectCryptoById } from '../../store/crypto/selectors/crypto.selector';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [CommonModule, StatsBoxComponent, TruncatePricePipe, DateFormatPipe, FavoriteButtonComponent],
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoComponent implements OnInit {
  public cryptoId: string = '';

  public crypto: Crypto | undefined;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  /**
   * Load component.
   */
  loadComponent(): void {
    this.getCryptoFromParams();
    this.getCryptoDetails();
  }

  /**
   * Get crypto id from params.
   */
  getCryptoFromParams(): void {
    this.activatedRoute.params.subscribe(
      (params) => (this.cryptoId = params['id'])
    );
  }

  /**
   * Get crypto details from store.
   */
  getCryptoDetails(): void {
    this.store
      .select(selectCryptoById(this.cryptoId))
      .subscribe((crypto) => (this.crypto = crypto));
  }
}
