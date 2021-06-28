import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './company/add-company/add-company.component';

import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import { ServiceComponent } from './service/service.component';
import { AddSubsidiaryComponent } from './subsidiary/add-subsidiary/add-subsidiary.component';
import { SubsidiaryComponent } from './subsidiary/subsidiary.component';

const MasterRoutes: Routes = [
  {
    path: 'companies',
    component: CompanyComponent,
  },
  {
    path: 'subsidiaries',
    component: SubsidiaryComponent
  },
  {
    path: 'departments',
    component: DepartmentComponent
  },
  {
    path: 'positions',
    component: PositionComponent
  },
  {
    path: 'services',
    component: ServiceComponent
  },
  {
    path: 'newcompany',
    component: AddCompanyComponent
  },
  {
    path: 'newsubsidiary',
    component: AddSubsidiaryComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(MasterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MasterRouterModule {}