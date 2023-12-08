import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class CryptoComponent {

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  /**
   * Get crypto details from store.
   */
  get getCryptoDetails$(): Observable<Crypto | undefined> {
    return this.store.select(selectCryptoById(this.activatedRoute.snapshot.params['id']));
  }
}
