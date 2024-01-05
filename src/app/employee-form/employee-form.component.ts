import {  Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModel } from '@angular/forms';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],

  })
export class EmployeeFormComponent implements OnInit {

  
  fetchEmployees: any;

  constructor(
    private employeeService: ServiceService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

    @ViewChild ('f') employeeform? : NgModel;

  Epl_id!: number
  name!: string;
  father_name!: string;
  date_of_birth: Date =  new Date();
  gender: boolean = true;
  nrc_exist: boolean = true;
  nrc!: string;

  showSuccessMessage = false;

  editArray:any = [];
  getEmployeeS:any = [];
  searchText: string = '';

  
  currentPage = 1;
  pageSize:number = 10;

  submit(){
    console.log(this.employeeform)
    console.log(this.employeeform?.valid)
  }
  
  ngOnInit(): void {
    this.GetEmployee();
    this.getEmployeeS.sort((a : any, b : any) => a.Epl_id - b.Epl_id);
   
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Assuming 'id' is the unique identifier for each employee
  }

  async SaveEmployee() {

    if (this.nrc_exist === undefined || this.nrc_exist === null) {
      this.nrc_exist= false;
    }

    
    var EmployeeS = {
      Epl_id: this.Epl_id,
      name: this.name,
      father_name: this.father_name,
      date_of_birth: this.date_of_birth,
      gender: this.gender,
      nrc_exist: this.nrc_exist,
      nrc: this.nrc,
    };

    if (!this.name) {
      alert('Please enter your name');
      return;
    }
    console.log(EmployeeS);
    console.log(this.name, '<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>');
    console.log(this.nrc_exist);

    this.employeeService.AddEmployee(EmployeeS).subscribe({
      next: (result: any) => {
        // Clear form values after saving
        this.Epl_id = this.Epl_id + 1;
        this.name = '';
        this.father_name = '';
        this.date_of_birth;
        this.gender = true;
        this.nrc = '';

        
        this.getEmployeeS.push(EmployeeS);
        this.getEmployeeS.sort((a : any, b : any) => a.Epl_id - b.Epl_id);

        
        this.showSuccessMessage = true;

        // Hide the success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        console.log('Employee Saved Successfully', result);
        // alert('Employee Saved Successfully');
        EmployeeS = result.data;
        console.log(this.getEmployeeS,"#>>>>>>>>>><<<<<<<<<<");
        // this.getEmployeeS.push(EmployeeS);
        // this.cdr.detectChanges();   
      //   const modal = document.getElementById('exampleModal');
      // if (modal) {
      //   $(modal).modal('hide');
      // }
      },

      error: (error: any) => {
        alert('Error Saving Employee');
        console.log('Error Saving Employee', error);
      },
    });
  }


    async GetEmployee(){
       this.employeeService.getEmployee().subscribe((result: any) => {
        this.getEmployeeS = result.data;

        this.getEmployeeS.sort((a: any, b: any) => a.Epl_id - b.Epl_id);
        console.log(result, "#Get Employee");
        console.log(result.nrc_exist,"<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>")
      })
    }

   DeleteEmployee(){

    console.log();
    this.employeeService.deleteOne(this.Epl_id).subscribe({
      next: () => {

        // this.getEmployeeS = this.getEmployeeS.filter((employee:any) => employee.id !== id);
        console.log("Employee Deleted Successfully");
        this.GetEmployee();
        this.getEmployeeS.sort((a: any, b: any) => a.Epl_id - b.Epl_id);
        // this.getEmployeeS.pop(this.SaveEmployee);
        // alert("Employee Deleted Successfully");
     
      },
      error: (error: any) => {
        alert("Failed to Delete Employee");
        console.log("Failed to Delete Employee",error);
      }
    })
   } 

   UpdateEmployee( ){
      var UpdateData = {
      name: this.name,
      father_name: this.father_name,
      date_of_birth: this.date_of_birth,
      gender: this.gender,
      nrc_exist: this.nrc_exist,
      nrc: this.nrc,
      }
      console.log(UpdateData,"updateData");
      console.log(this.Epl_id);
      this.employeeService.upDateEmployee(this.Epl_id,UpdateData).subscribe({
        next: (result: any) => {
          console.log("Update Successful",result);
    
          this.GetEmployee();
          this.getEmployeeS.sort((a: any, b: any) => a.Epl_id - b.Epl_id);
        },
        error: (error: any) => {
          console.log("Error Updating Employee",error);
        }
      })
   }
   getEpl_id(id:number){
    return this.Epl_id = id;
   }

   NewClear(){
    this.Epl_id+1;
    this.name = '';
    this.father_name = '';
    this.date_of_birth ; Date.now();
    this.gender = true;
    this.nrc_exist = true;
    this.nrc = '';
   }

   clearNrc(){
    if(this.nrc_exist == false){
       this.nrc = '';
    }
   }

   getEditArray(data: any){
    this.editArray = data;
    console.log(this.editArray);
   }

    isUnderAge(): boolean {
    if (!this.date_of_birth) {
      return false; // No date provided, so no warning
    }

    const birthDate = new Date(this.date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    return age < 18;
  }

  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  importFromExcel(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const importedData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  
      // Process the imported data as needed
      console.log(importedData);
    };
  
    reader.readAsBinaryString(file);
  }
  



  

}
