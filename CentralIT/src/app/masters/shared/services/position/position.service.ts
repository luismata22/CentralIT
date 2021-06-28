import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionModel } from 'src/app/models/masters/position';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { HttpHelpersService } from 'src/app/shared/common-directive/services/http-helpers.service';
import { environment } from 'src/environments/environment';
import { PositionFilterViewModel } from '../../viewmodels/filters/positionfilter';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private _httpClient: HttpClient, private _httpHelpersService: HttpHelpersService,
    private loginservice: LoginService) { }

  getPositionsbyfilter(filters: PositionFilterViewModel = new PositionFilterViewModel()){
    return this._httpClient
      .get<PositionModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Position/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }

  postPosition(position: PositionModel = new PositionModel()){
    const { id } = this.loginservice.storeUser;
    return this._httpClient
      .post<number>(`${environment.API_BASE_URL_CENTRALIT}/Position/`+id, position)
  }

  getPositionsDepartmentsbyfilter(filters: PositionFilterViewModel = new PositionFilterViewModel()){
    return this._httpClient
      .get<PositionModel[]>(`${environment.API_BASE_URL_CENTRALIT}/Position/PositionDepartment/`, {
        params: this._httpHelpersService.getHttpParamsFromPlainObject(filters)
      })
  }
}
