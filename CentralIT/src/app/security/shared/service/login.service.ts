import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotFoundError } from 'src/app/models/common/errors/notfounderror';
import { Authenticate } from 'src/app/models/security/authenticate';
import { LoginModel } from 'src/app/models/security/login';
import { Tokens } from 'src/app/models/security/tokens';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly USER_STATE = '_USER_STATE';
  private readonly REMEMBER_ME = '_REMEMBER_ME';
  private readonly ACCESS_STATE = '_ACCESS_STATE';
  private loggedUser: string = "";

  constructor(public httpClient: HttpClient) { }

  get rememberMe() {
    return localStorage.getItem(this.REMEMBER_ME) === 'true' ? true : false;
  }

  get idUser() {
    return this.storeUser?.id ?? '';
  }

  get entityName() {
    return this.storeUser?.fullName ?? '';
  }

  get userName() {
    return this.storeUser?.email ?? '';
  }

  get jwt() {
    return this.storeUser?.token ?? '';
  }

  get storeUser() {
    if (this.rememberMe === true) {
      return JSON.parse(localStorage.getItem(this.USER_STATE));
    }
    return JSON.parse(sessionStorage.getItem(this.USER_STATE));
  }

  login(credentials: LoginModel): Observable<boolean> {
    return this.httpClient.post<any>
    (`${environment.API_BASE_URL_CENTRALIT}/Login/Authenticate`,
    credentials).pipe(
      tap(tokens => {
          const data = {
              id: tokens.id,
              name: tokens.name,
              lastName: tokens.lastName,
              email: tokens.email,
              token: tokens.token,
              refreshToken: tokens.refreshToken,
              rememberMe: credentials.rememberMe
            };
          this.doLogin(credentials.email, {...data});
          return of(true);
        })
        , catchError((error) => {
          console.log(error);
           let errorBase: NotFoundError;
            errorBase = {
              ErrorMsg: error.error.message,
              Code: error.status
             };
             return throwError(errorBase);
        })
    );

  }
  private doLogin(username: string, data: Authenticate) {
    this.loggedUser = username;
    this.storeTokens(data);
  }

  private storeTokens(data: Authenticate) {
    const item = {
      id: data.id,
      token: data.token,
      refreshToken: data.refreshToken,
      fullName: data.name + ' ' + data.lastName,
      email: data.email
    };
    localStorage.setItem(this.REMEMBER_ME, JSON.stringify(data.rememberMe));

    if (data.rememberMe) {
      localStorage.removeItem(this.USER_STATE);
      localStorage.setItem(this.USER_STATE, JSON.stringify(item));
    } else {
      sessionStorage.removeItem(this.USER_STATE);
      sessionStorage.setItem(this.USER_STATE, JSON.stringify(item));
    }

  }

  updateRememberMe(bol: boolean) {
    localStorage[this.REMEMBER_ME] = JSON.stringify(bol);
  }

  removeUserStateFromStorage() {
    localStorage.removeItem(this.USER_STATE);
    localStorage.removeItem(this.ACCESS_STATE);
    sessionStorage.removeItem(this.USER_STATE);
  }

  refreshToken() {
    return this.httpClient.post<any>(`${environment.API_BASE_URL_CENTRALIT}/Login/RefreshToken`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  private getRefreshToken() {
    return localStorage.getItem('');
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.USER_STATE, jwt);
  }

}
