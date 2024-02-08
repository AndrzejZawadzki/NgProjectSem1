import { Pipe, PipeTransform } from '@angular/core';
import { GameplayHistory } from './models';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(
    value: GameplayHistory[],
    sortOrder: 'Newest first' | 'Oldest first'
  ): GameplayHistory[] {
    if (!sortOrder) {
      return value;
    }
    if (sortOrder === 'Newest first') {
      return value
        .slice()
        .sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());
    } else {
      return value
        .slice()
        .sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime());
    }
  }
}
