import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DocumentTypes } from 'src/app/models/masters/documenttype';
import { RoleModel } from 'src/app/models/security/role';
import { UserModel } from 'src/app/models/security/user';
import { UserNewPasswordModel } from 'src/app/models/security/usernewpassword';
import { HttpHelpersService } from 'src/app/shared/common-directive/services/http-helpers.service';
import { environment } from 'src/environments/environment';
import { DocumentTypeFilterViewModel } from '../../viewmodels/documenttypefilter';
import { ProfileViewModel } from '../../viewmodels/profile';
import { RoleFilterViewModel } from '../../viewmodels/rolefilter';
import { UserFilterViewModel } from '../../viewmodels/userfilter';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient, private _httpHelpersService: HttpHelpersService,
    private loginservice: LoginService) { }

  getUserbyfilter(filters: UserFilterViewModel = new UserFilterViewModel()){
    return this._httpClient
      .get<UserModel[]>(`${environment.API_BASE_URL_CENTRALIT}/User/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }

  postUser(user: UserModel = new UserModel()){
    const {id}  = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/User/`+id, user)
  }

  getDocumentType(filter: DocumentTypeFilterViewModel = new DocumentTypeFilterViewModel()){
    return this._httpClient
      .get<DocumentTypes[]>(`${environment.API_BASE_URL_CENTRALIT}/User/GetDocumentType`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filter)
      })
  }

  getRolesbyfilter(filter: RoleFilterViewModel = new RoleFilterViewModel()){
    return this._httpClient
      .get<RoleModel[]>(`${environment.API_BASE_URL_CENTRALIT}/User/GetRoles`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filter)
      })
  }

  postRoleUser(user: UserModel = new UserModel()){
    const {id}  = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/User/PostRoleUser/`+id, user)
  }

  postNewPassWord(user: UserModel = new UserModel()){
    const {id}  = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/User/PostNewPassword/`+id, user)
  }

  postNewPassWordProfile(user: UserNewPasswordModel = new UserNewPasswordModel()){
    const {id}  = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/User/PostNewPasswordUser/`+id, user)
  }

  postImageUpload(model: ProfileViewModel){
    const {id}  = this.loginservice.storeUser;
    return this._httpClient.post<any>(`${environment.API_BASE_URL_CENTRALIT}/User/PostImageUpload/`+id, model);
   
  }

  getProfileImage(){
    const {id}  = this.loginservice.storeUser;
    return this._httpClient
      .get<ProfileViewModel>(`${environment.API_BASE_URL_CENTRALIT}/User/GetImageProfile/`+id, {
      })
  }
}
