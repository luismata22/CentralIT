import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRequestsComponent } from './panel-requests/panel-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterRouterModule } from '../masters/masters-routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestsRouterModule } from './requests-routing';
import { AddRequestComponent } from './add-request/add-request.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportComponent } from './report/report.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [PanelRequestsComponent, AddRequestComponent, ReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterRouterModule,
    NgbModule,
    RequestsRouterModule,
    NgMultiSelectDropDownModule,
    NgxMaskModule.forRoot()
  ]
})
export class RequestsModule { }
