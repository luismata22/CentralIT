import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentModel } from 'src/app/models/masters/department';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { HttpHelpersService } from 'src/app/shared/common-directive/services/http-helpers.service';
import { environment } from 'src/environments/environment';
import { DepartmentxServiceFilterViewModel } from '../../viewmodels/filters/departmentxservicefilter';
import { DepartmentFilterViewModel } from '../../viewmodels/filters/departmentfilter';
import { DepartmentServiceViewModel } from '../../viewmodels/departmentxservice';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _httpClient: HttpClient, private _httpHelpersService: HttpHelpersService,
    private loginservice: LoginService) { }

  getDepartmentbyfilter(filters: DepartmentFilterViewModel = new DepartmentFilterViewModel()){
    return this._httpClient
      .get<DepartmentModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Department/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }

  postDepartment(department: DepartmentModel = new DepartmentModel()){
    const { id } = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/Department/`+id, department)
  }
}
