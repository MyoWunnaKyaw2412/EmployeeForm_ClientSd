import { Pipe, PipeTransform } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // transform(getEmployeeS: any, searchText: string): any {
    
  //   if(!getEmployeeS || !searchText){
  //     return getEmployeeS;
  //   } 
  //     getEmployeeS.filter((EmployeeS:any) => 
  //     EmployeeS.name.toLocaleLowerCase().includes(searchText)
  //     // EmployeeS.Epl_id.toLocaleLowerCase().includes(searchText) 
  //     // EmployeeS.father_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) |
  //     // EmployeeS.gender.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) |
  //     // EmployeeS.nrc.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  //   );
  // }



  // transform(getEmployeeS: any, searchText: string): any {
    
  //   if (!Array.isArray(getEmployeeS) || !searchText) {
  //     return getEmployeeS;
  //   }

  //   searchText = searchText.toLowerCase();

  //   return getEmployeeS.filter((employee: any) => 
  //     employee.name.toLowerCase().includes(searchText) ||
  //     employee.id.toString().includes(searchText) ||
  //     employee.fatherName.toLowerCase().includes(searchText) ||
  //     employee.gender.toLowerCase().includes(searchText) ||
  //     employee.nrc.toLowerCase().includes(searchText)
  //   );
  // }

  transform(getEmployeeS: any, searchText: string): any {
    
    if (!Array.isArray(getEmployeeS) || !searchText) {
      return getEmployeeS;
    }

    searchText = searchText.toLowerCase();

    return getEmployeeS.filter((EmployeeS: any) => 
      (EmployeeS.name && EmployeeS.name.toLowerCase().includes(searchText)) ||
      (EmployeeS.Epl_id && EmployeeS.Epl_id.toString().includes(searchText)) ||
      (EmployeeS.father_name && EmployeeS.father_name.toLowerCase().includes(searchText)) ||
      (EmployeeS.gender === 'String' && EmployeeS.gender.toLowerCase().includes(searchText)) ||
      (EmployeeS.nrc && EmployeeS.nrc.toLowerCase().includes(searchText)) ||
      (EmployeeS.date_of_birth === 'Date' && EmployeeS.date_of_birth.toLowerCase().includes(searchText))
    );
  }

}
