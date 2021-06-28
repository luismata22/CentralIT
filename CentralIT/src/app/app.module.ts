import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule,LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import { AppRoutes } from './app-routing.module';
import { AuthInterceptor } from './interceptors/httpconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FullComponent } from './layouts/full/full.component';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { SpinnerComponent } from './shared/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    SpinnerComponent,
    AppComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot({
      positionClass : 'toast-top-right'
    })
  ],
  providers: [
    { provide: 'API_BASE_URL', useFactory: getBaseUrl },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      HttpClient,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    FormBuilder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl(): string {
  return environment.API_BASE_URL_CENTRALIT;
}

