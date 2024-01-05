import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  AddEmployee( employeeData : any):Observable<any>
  {
    const body = JSON.stringify(employeeData);

    console.log(employeeData);
    return this.http.post('http://localhost:8000/api/v1/employee',body,this.httpOptions);
  }

  getEmployee( ) {
    return this.http.get('http://localhost:8000/api/v1/employee');
  }

  deleteOne(Epl_id: any){
    return this.http.delete(`http://localhost:8000/api/v1/employee/${Epl_id}`);
  }

  upDateEmployee(Epl_id:any,data: any){
    return this.http.patch(`http://localhost:8000/api/v1/employee/${Epl_id}`,data);
  }

}
