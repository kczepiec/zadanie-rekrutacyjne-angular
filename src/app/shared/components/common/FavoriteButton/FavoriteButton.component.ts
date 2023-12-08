import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Crypto } from '../../../../interfaces/Crypto.interface';
import { isCryptoInFavorites } from '../../../../store/crypto/selectors/crypto.selector';
import { CryptoFacade } from '../../../facades/Crypto.facade';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './FavoriteButton.component.html',
  styleUrl: './FavoriteButton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent implements OnInit {
  /**
   * Crypto item.
   */
  @Input() crypto!: Crypto;
  @Input() showLabel?: boolean = false;

  /**
   * Crypto list.
   */
  protected crypto$: Observable<Crypto[]> = of([]);
  protected isFavorite$: Observable<boolean> = of(false);

  /**
   * Font Awesome icons.
   */
  public faStarRegular = faStarRegular;
  public faStarSolid = faStarSolid;

  /**
   * Destroy subject.
   */
  private destroy$ = new Subject<void>();

  constructor(
    protected readonly cryptoFacade: CryptoFacade,
    private readonly store: Store
  ) {}

  ngOnInit(): void {}

  /**
   * Adds a crypto to the favorites list.
   * @param crypto Crypto to add to the favorites list.
   */
  addToFavorites(crypto: Crypto) {
    this.cryptoFacade.addToFavorites(crypto);
  }

  /**
   * Removes a crypto from the favorites list.
   * @param crypto Crypto to remove from the favorites list.
   */
  removeFromFavorites(cryptoId: string) {
    this.cryptoFacade.removeFromFavorites(cryptoId);
  }

  /**
   * Checks if a crypto is in the favorites list.
   * @param crypto Crypto to check.
   * @returns True if the crypto is in the favorites list, false otherwise.
   */
  checkIfCryptoIsFavorite(crypto: string) {
    return (this.isFavorite$ = this.store
      .select(isCryptoInFavorites(crypto))
      .pipe(takeUntil(this.destroy$)));
  }
}
