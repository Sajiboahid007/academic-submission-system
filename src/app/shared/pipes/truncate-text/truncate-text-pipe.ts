import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: false,
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, size: number): string {
    if (typeof value !== 'string') {
      return value;
    }

    if (value.length <= size) {
      return value;
    }

    return value.substring(0, size) + '...';
  }
}
