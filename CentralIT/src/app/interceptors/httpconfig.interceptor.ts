import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoginService } from '../security/shared/service/login.service';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { Tokens } from '../models/security/tokens';
import { UserPermissionsService } from '../security/shared/service/user/user-permissions.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  constructor(private _loginService: LoginService,
    private userPersmissionsService: UserPermissionsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token  = this._loginService.jwt;
    if (token) {
      request = this.setToken(request, token );
    }
    this.userPersmissionsService.getPermissions();
    request = this.setCors(request);
    console.log("request headers", request.headers);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse ) { }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        // if (error.status === 404) {
        //   return this.handle404Error(request, next);
        // }
        return throwError(error);
      }));
  }

  private setToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

  private setCors(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials': 'true',
        'Accept': '*/*'
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this._loginService.refreshToken().pipe(
        switchMap((token: Tokens) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token);
          return next.handle(this.setToken(request, token.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.setToken(request, jwt));
        }));
    }
  }

  private handle404Error(request: HttpRequest<any>, next: HttpHandler) {
    return request;
  }
}
