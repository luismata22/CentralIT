import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRouterModule } from './security-routing';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AssignroleComponent } from './assignrole/assignrole.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask'


@NgModule({
  declarations: [LoginComponent, UserComponent, AssignroleComponent, AddUserComponent, ProfileComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SecurityRouterModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    NgxMaskModule.forRoot()
  ]
})
export class SecurityModule { }
