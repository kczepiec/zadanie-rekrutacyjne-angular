import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'mediumDate'): string {
    if (!value) return '';

    // Create a new Date object
    const date = new Date(value);

    // Use Intl.DateTimeFormat for localization
    const formatter = new Intl.DateTimeFormat('pl-PL', {
      // You can customize these options as needed
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });

    return formatter.format(date);
  }
}
