import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Permissions from 'src/app/shared/utils/access';
import { UserPermissionsService } from 'src/app/security/shared/service/user/user-permissions.service';
import { SecurityService } from 'src/app/security/shared/service/security.service';
import { LoginService } from 'src/app/security/shared/service/login.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[]=[];
  permissionsIDs = {...Permissions};
  userId: number;
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public userPermissions: UserPermissionsService,
    public _securitySerice: SecurityService,
    private _loginService: LoginService
  ) {}

  // End open close
  ngOnInit() {
    this.userId = Number(this._loginService.idUser);
    this.getAccessbyUser();
  }

  searchModule(){
    var ROUTES1: RouteInfo[] = [];
    ROUTES.forEach(route => {
      if (route.moduleId == 2) {
        if (this.userPermissions.allowed(this.permissionsIDs.UPDATE_DEPARTMENT_PERMISSION_ID)) {
          ROUTES1.push(ROUTES.find(x => x.moduleId == 1000))
          ROUTES1.push(route);
        }
      }
      if (route.moduleId == 3) {
        if (this.userPermissions.allowed(this.permissionsIDs.UPDATE_POSITION_PERMISSION_ID)) {
          if (ROUTES1.filter(X => X.moduleId == 1000).length <= 0) {
            ROUTES1.push(ROUTES.find(x => x.moduleId == 1000))
          }
          ROUTES1.push(route);
        }
      }
      if (route.moduleId == 4) {
        if (this.userPermissions.allowed(this.permissionsIDs.UPDATE_SERVICE_PERMISSION_ID)) {
          if (ROUTES1.filter(X => X.moduleId == 1000).length <= 0) {
            ROUTES1.push(ROUTES.find(x => x.moduleId == 1000))
          }
          ROUTES1.push(route);
        }
      }
      if (route.moduleId == 5) {
        if (this.userPermissions.allowed(this.permissionsIDs.UPDATE_REQUEST_PERMISSION_ID)) {
          ROUTES1.push(ROUTES.find(x => x.moduleId == 1001))
          ROUTES1.push(route);
        }
      }
      if (route.moduleId == 7) {
        if (this.userPermissions.allowed(this.permissionsIDs.CHECK_REPORT_REQUEST_ID)) {
          if (ROUTES1.filter(X => X.moduleId == 1001).length <= 0) {
            ROUTES1.push(ROUTES.find(x => x.moduleId == 1001))
          }
          
          ROUTES1.push(route);
        }
      }
      if (route.moduleId == 6) {
        if (this.userPermissions.allowed(this.permissionsIDs.UPDATE_USER_PERMISSION_ID)) {
          ROUTES1.push(ROUTES.find(x => x.moduleId == 1002))
          ROUTES1.push(route);
        }
      }
      
    });
    this.sidebarnavItems = ROUTES1.filter(sidebarnavItem => sidebarnavItem);
  }

  getAccessbyUser(){
    this._securitySerice.getAccessPromise(this.userId).then(accesses => {
     this._securitySerice.sendToStorage(accesses);
     this.userPermissions.permissions = [];
     accesses.forEach(element => {
       this.userPermissions.permissions.push(element.id)
     });
     this.searchModule();
    });
  }
}
