'use client';

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Crypto } from '../../../interfaces/Crypto.interface';
import { PercentageChangeDirective } from '../../directives/PercentageChange.directive';
import { CryptoFacade } from '../../facades/Crypto.facade';
import { TruncatePricePipe } from '../../pipes/TruncatePrice.pipe';
import { CryptoService } from '../../services/Crypto.service';
import { FavoriteButtonComponent } from '../common/FavoriteButton/FavoriteButton.component';
import { SvgIconComponent } from '../common/SvgIcon/Svg-Icon.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    PercentageChangeDirective,
    TruncatePricePipe,
    FontAwesomeModule,
    SvgIconComponent,
    RouterLink,
    FavoriteButtonComponent
  ],
  providers: [CryptoService],
  templateUrl: './Table.component.html',
  styleUrl: './Table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  /**
   * Crypto list.
   */
  protected crypto$: Observable<Crypto[]> = of([]);

  /**
   * Destroy subject.
   */
  private destroy$ = new Subject<void>();

  constructor(
    protected readonly cryptoFacade: CryptoFacade,
  ) {}

  ngOnInit() {
    this.fetchCryptoList();
  }

  fetchCryptoList() {
    this.crypto$ = this.cryptoFacade
      .getCryptoList()
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
