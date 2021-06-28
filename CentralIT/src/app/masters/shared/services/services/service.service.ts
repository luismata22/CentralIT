import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceModel } from 'src/app/models/masters/service';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { HttpHelpersService } from 'src/app/shared/common-directive/services/http-helpers.service';
import { environment } from 'src/environments/environment';
import { ServiceFilterViewModel } from '../../viewmodels/filters/servicefilter';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _httpClient: HttpClient, private _httpHelpersService: HttpHelpersService,
    private loginservice: LoginService) { }

  getServicesbyfilter(filters: ServiceFilterViewModel = new ServiceFilterViewModel()){
    return this._httpClient
      .get<ServiceModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Service/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }

  postService(service: ServiceModel = new ServiceModel()){
    const { id } = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/Service/`+id, service)
  }
}
