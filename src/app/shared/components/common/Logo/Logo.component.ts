import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SafeHtmlPipe } from '../../../pipes/SafeHtml.pipe';

@Component({
  selector: 'logo',
  standalone: true,
  imports: [
    CommonModule,
    SafeHtmlPipe
  ],
  template: '<img [src]="logo">',
})
export class LogoComponent {
  logo: string = 'assets/images/logo.svg';

  constructor() {}
}
