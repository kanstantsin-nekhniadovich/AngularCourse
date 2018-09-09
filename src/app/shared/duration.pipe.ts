import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value) {
    switch (value) {
      case 1: return 'Half Hour';
      case 2: return '1 Hour';
      case 3: return 'Half a day';
      case 4: return 'Full day';
      default: return value.toString();
    }
  }
}