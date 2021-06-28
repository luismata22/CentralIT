import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRouterModule } from './home-routing';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HomeRouterModule
  ]
})
export class HomeModule { }
