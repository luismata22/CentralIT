import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { UserService } from 'src/app/security/shared/service/user/user.service';
import { ProfileViewModel } from 'src/app/security/shared/viewmodels/profile';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  previewUrl: string = "";
  fullName: string ="";
  public showSearch = false;

  constructor(private _loginService: LoginService,
    private userService: UserService) {}

  ngOnInit() {
    this.getProfileImage();
    this.fullName = this._loginService.entityName;
    
  }
  onLogout(){
    this._loginService.removeUserStateFromStorage();
    window.location.replace('');
  }

  getProfileImage(){
    this.userService.getProfileImage().subscribe((data: ProfileViewModel) => {
      this.previewUrl = data.image;
    });
  }
}
