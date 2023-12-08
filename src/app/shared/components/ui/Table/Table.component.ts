'use client';

import { CommonModule } from '@angular/common';
import {
  Component
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PercentageChangeDirective } from '../../../directives/PercentageChange.directive';
import { CryptoFacade } from '../../../facades/Crypto.facade';
import { TruncatePricePipe } from '../../../pipes/TruncatePrice.pipe';
import { CryptoService } from '../../../services/Crypto.service';
import { FavoriteButtonComponent } from '../../common/FavoriteButton/FavoriteButton.component';
import { SvgIconComponent } from '../../common/SvgIcon/Svg-Icon.component';

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
  styleUrl: './Table.component.scss'
})
export class TableComponent {
  constructor(
    protected readonly cryptoFacade: CryptoFacade,
  ) {}

  get cryptoList() {
    return this.cryptoFacade.getCryptoList();
  }

}
