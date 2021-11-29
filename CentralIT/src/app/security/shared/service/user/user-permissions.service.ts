import { Injectable, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService implements OnInit {

  permissions: number[] = [];
  constructor(private _securitySerice: SecurityService) {
    Object.values({ ...this._securitySerice.permissions }).map((item: any) => {
      this.permissions.push(item);
    });

    //debugger;
    //this.getPermissions();
  }

  ngOnInit() { }

  allowed = (permissionId: number) => this.permissions.includes(permissionId);

  async getPermissions() {
    await this._securitySerice.permissions.forEach(item => {
      this.permissions.push(item);
    });
  }

}
