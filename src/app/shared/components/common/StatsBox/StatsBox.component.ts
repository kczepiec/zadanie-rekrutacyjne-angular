import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PercentageChangeDirective } from '../../../directives/PercentageChange.directive';

@Component({
  selector: 'stats-box',
  standalone: true,
  imports: [
    CommonModule,
    PercentageChangeDirective
  ],
  templateUrl: './StatsBox.component.html',
  styleUrl: './StatsBox.component.scss',
})
export class StatsBoxComponent {

  @Input() title: string = '';
  @Input() value: number | string | null = null;
  @Input() icon: string = '';
  @Input() valueChange?: number;
  @Input() class?: string = 'w-full bg-white border rounded-lg h-[120px] p-6 flex items-center space-y-4';

  constructor() {}

  ngOnInit() {
  }
}
