import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriorityModel } from 'src/app/models/masters/priority';
import { RequestTypeModel } from 'src/app/models/masters/requesttype';
import { StatusModel } from 'src/app/models/masters/status';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { HttpHelpersService } from 'src/app/shared/common-directive/services/http-helpers.service';
import { environment } from 'src/environments/environment';
import { PriorityFilterViewModel } from '../../viewmodels/filters/priorityfilter';
import { RequestTypeFilterViewModel } from '../../viewmodels/filters/requesttypefilter';
import { StatusFilterViewModel } from '../../viewmodels/filters/statusfilter';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _httpClient: HttpClient, private _httpHelpersService: HttpHelpersService,
    private loginservice: LoginService) { }

  getStatusbyfilter(filters: StatusFilterViewModel = new StatusFilterViewModel()){
    return this._httpClient
      .get<StatusModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Common/Status/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }
  getPrioritiesbyfilter(filters: PriorityFilterViewModel = new PriorityFilterViewModel()){
    return this._httpClient
      .get<PriorityModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Common/Priority/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }

  getRequestTypesbyfilter(filters: RequestTypeFilterViewModel = new RequestTypeFilterViewModel()){
    return this._httpClient
      .get<RequestTypeModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Common/RequestType/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }
}
