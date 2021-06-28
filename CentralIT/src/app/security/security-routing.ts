import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserComponent } from './user/user.component';

const SecurityRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'newuser/:id',
    component: AddUserComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(SecurityRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SecurityRouterModule {}