import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '../../shared/components/ui/Table/Table.component';
import { PercentageChangeDirective } from '../../shared/directives/PercentageChange.directive';
import { CryptoService } from '../../shared/services/Crypto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableComponent, PercentageChangeDirective],
  providers: [Store, CryptoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}
