import { Routes } from '@angular/router';
import { CryptoComponent } from './pages/crypto/crypto.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crypto/:id', component: CryptoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
