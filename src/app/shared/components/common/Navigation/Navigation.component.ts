import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../Logo/Logo.component';

@Component({
  selector: 'ui-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LogoComponent
  ],
  templateUrl: './Navigation.component.html',
  styleUrl: './Navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {

  ngOnInit(): void { }

}
