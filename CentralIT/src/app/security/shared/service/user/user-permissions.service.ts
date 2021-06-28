import { Injectable } from '@angular/core';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {

  permissions: number[] = [];
  constructor( private _securitySerice: SecurityService ) {
      /* Object.values({...this._securitySerice.permissions}).map((item: number) => {
          this.permissions.push(item);
      }) */
      this._securitySerice.permissions.forEach(item => {
        this.permissions.push(item);
      });
  }

  ngOnInit() {}

  allowed = (permissionId: number) => this.permissions.includes(permissionId);
  
}
