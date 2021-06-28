import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRequestComponent } from './add-request/add-request.component';
import { PanelRequestsComponent } from './panel-requests/panel-requests.component';
import { ReportComponent } from './report/report.component';

const RequestsRoutes: Routes = [
  {
    path: 'panel-requests',
    component: PanelRequestsComponent,
  },
  {
    path: 'newrequest',
    component: AddRequestComponent,
  },
  {
    path: 'reports',
    component: ReportComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(RequestsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RequestsRouterModule {}