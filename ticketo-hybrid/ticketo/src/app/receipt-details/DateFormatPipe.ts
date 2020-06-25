import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(args?: any): any {
    ///MMM/dd/yyyy
    let date = super.transform(new Date(), "dd/MM/yyyy");
    return new Date(date).toISOString();
  }
}
