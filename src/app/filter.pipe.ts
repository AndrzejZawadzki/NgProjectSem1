import { Pipe, PipeTransform } from '@angular/core';
import { gameplayHistory } from './models';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    values: Array<gameplayHistory>,
    action: string
  ): Array<gameplayHistory> {
    if (!action) {
      return values;
    }
    return values.filter((entry) => {
      return entry.action === action;
    });
  }
}
