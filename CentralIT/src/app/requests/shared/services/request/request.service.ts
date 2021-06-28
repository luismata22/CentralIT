import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestModel } from 'src/app/models/request/request';
import { RequestGetModel } from 'src/app/models/request/requestGet';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { HttpHelpersService } from 'src/app/shared/common-directive/services/http-helpers.service';
import { environment } from 'src/environments/environment';
import { ReportFilterViewModel } from '../../viewmodels/reportfilter';
import { RequestFiltesViewModel } from '../../viewmodels/requestfilter';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _httpClient: HttpClient, private _httpHelpersService: HttpHelpersService,
    private loginservice: LoginService) { }

  getRequestsbyfilter(filters: RequestFiltesViewModel = new RequestFiltesViewModel()){
    return this._httpClient
      .get<RequestGetModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Request/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }

  getReportRequestsbyfilter(filters: ReportFilterViewModel = new ReportFilterViewModel()){
    return this._httpClient
      .get<RequestGetModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Request/GetReports/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }

  postRequest(service: RequestModel = new RequestModel()){
    const { id } = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/Request/`+id, service)
  }
}
