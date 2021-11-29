import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Access } from 'src/app/models/security/access';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private readonly ACCESS_STATE = '_ACCESS_STATE';
  permissionsList: number[] = [];

  constructor(public httpClient: HttpClient) { }

  getAccessPromise(idUser: number) {
    return this.httpClient.get<Access[]>(
      `${environment.API_BASE_URL_CENTRALIT}/Permission/GetPermissionsByUser?idUser=${idUser}`)
      .toPromise()
      .then(result => result )
      .catch( error => {
        return error;
      });
  }

  sendToStorage(result: Access[]) {
    localStorage.setItem(this.ACCESS_STATE, JSON.stringify(result));
    
  }

  get permissions() {
    var accesses: Access[] = JSON.parse(localStorage.getItem(this.ACCESS_STATE));
    if (accesses == null) {
      accesses = []
    }
    this.permissionsList = [];
    Object.values(accesses).map(item => {
            this.permissionsList.push(item.id);
  });
  return this.permissionsList;
  }

  async getPermissions() {
      var accesses: Access[] = JSON.parse(localStorage.getItem(this.ACCESS_STATE));
      if (accesses == null) {
        accesses = []
      }
      Object.values(accesses).map(item => {
        this.permissionsList.push(item.id);
      });
      await this.permissionsList;
  }
}
