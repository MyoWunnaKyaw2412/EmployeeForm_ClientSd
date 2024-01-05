import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nrcexist'
})
export class NrcexistPipe implements PipeTransform {

  transform(value: boolean): string {
    return value == true ? 'Yes' : 'No';
  }

}
