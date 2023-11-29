import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[percentageChange]',
  standalone: true,
})
export class PercentageChangeDirective {
  @Input('percentageChange') value: number = 0;

  constructor() {}

  /**
   * Add positive class if value is greater than 0.
   */
  @HostBinding('class.text-green-600') get isPositive() {
    return this.value > 0;
  }

  /**
   * Add negative class if value is less than 0.
   */
  @HostBinding('class.text-red-600') get isNegative() {
    return this.value < 0;
  }

  /**
   * Add default class if value is equal 0.
   */
  @HostBinding('class.text-zinc-600') get isZero() {
    return this.value === 0;
  }
}
