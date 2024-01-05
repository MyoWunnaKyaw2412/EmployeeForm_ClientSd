import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { GenderPipe } from './gender.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './search.pipe';
import { NrcexistPipe } from './nrcexist.pipe';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    GenderPipe,
    SearchPipe,
    NrcexistPipe,
    
    // searchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
