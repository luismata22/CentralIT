import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { SecurityService } from 'src/app/security/shared/service/security.service';
import { UserService } from 'src/app/security/shared/service/user/user.service';
import { ProfileViewModel } from 'src/app/security/shared/viewmodels/profile';

//import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  previewUrl: string;
	//public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router,
    private _loginService: LoginService,
    private _securityService: SecurityService,
    private userService: UserService) {
      
    }

  fullName: string ="";
  userId: number;
  public innerWidth: number=0;
  public defaultSidebar='';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    var a  = this._loginService.storeUser;
    this.userId = Number(this._loginService.idUser);
    if (this.userId <= 0 && a == null) {
      this.router.navigate(['/login']);
    }
    if (this.router.url === '/') {
      this.router.navigate(['/login']);
    }
    this.defaultSidebar = this.sidebartype;
    this.fullName = this._loginService.entityName;
    //this.userId = Number(this._loginService.idUser);
    this.getAccessbyUser();
    this.getProfileImage();
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:string) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }

  onLogout(){
    this._loginService.removeUserStateFromStorage();
    window.location.replace('');
  }

  getAccessbyUser(){
    this._securityService.getAccessPromise(this.userId).then(accesses => {
     this._securityService.sendToStorage(accesses);
  });
  }

  getProfileImage(){
    this.userService.getProfileImage().subscribe((data: ProfileViewModel) => {
      this.previewUrl = data.image;
    });
  }
}
