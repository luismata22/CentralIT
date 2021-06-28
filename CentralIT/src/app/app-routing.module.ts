import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './security/login/login.component';

export const AppRoutes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
  },
  
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: '',
        loadChildren:
          () => import('./security/security.module').then(m => m.SecurityModule),
      },
      {
        path: '',
        loadChildren:
          () => import('./masters/masters.module').then(m => m.MastersModule)
      },
      {
         path: '',
        loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  },
];
