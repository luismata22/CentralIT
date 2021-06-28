import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterRouterModule } from './masters-routing';
import { CompanyComponent } from './company/company.component';
import { SubsidiaryComponent } from './subsidiary/subsidiary.component';
import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import { ServiceComponent } from './service/service.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddSubsidiaryComponent } from './subsidiary/add-subsidiary/add-subsidiary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [CompanyComponent, SubsidiaryComponent, DepartmentComponent, PositionComponent, ServiceComponent, AddCompanyComponent, AddSubsidiaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterRouterModule,
    NgbModule,
    NgMultiSelectDropDownModule,
  ]
})
export class MastersModule { }
