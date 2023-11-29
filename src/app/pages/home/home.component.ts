import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '../../shared/components/Table/Table.component';
import { CryptoService } from '../../shared/services/Crypto.service';
import { loadCryptosSuccess } from '../../store/crypto/actions/crypto.actions';
import { PercentageChangeDirective } from '../../shared/directives/PercentageChange.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableComponent, PercentageChangeDirective],
  providers: [Store, CryptoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly cryptoService: CryptoService,
    private store: Store
  ) {}

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
