import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePrice',
  standalone: true,
})
export class TruncatePricePipe implements PipeTransform {
  /**
   * Truncate number to two decimal places.
   * @param value number to truncate
   * @returns truncated number
   */
  transform(value: number): number {
    return Math.trunc(value * 100) / 100;
  }
}
