import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Component, DebugElement, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/security/user';
import { UserNewPasswordModel } from 'src/app/models/security/usernewpassword';
import { environment } from 'src/environments/environment';
import { LoginService } from '../shared/service/login.service';
import { UserService } from '../shared/service/user/user.service';
import { ProfileViewModel } from '../shared/viewmodels/profile';
import { UserFilterViewModel } from '../shared/viewmodels/userfilter';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  idUserLogged: number;
  user: UserModel = new UserModel();
  editprofile: boolean = false;
  submittedUser: boolean = false;
  submittedPassword: boolean = false;
  @ViewChild("modalChangePassword") modalChangePassword: ElementRef;
  modalReference: NgbModalRef;
  acctualityPassword: string = "";
  newPassword: string = "";
  confirmationPassword: string = "";

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  base64image: string = "";
  private readonly USER_STATE = '_USER_STATE';
  private readonly REMEMBER_ME = '_REMEMBER_ME';
  private readonly ACCESS_STATE = '_ACCESS_STATE';
  uploadForm: FormGroup;

  constructor(private loginservice: LoginService,
    private userService: UserService,
    private toastrservice: ToastrService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.idUserLogged = this.loginservice.storeUser.id;
    this.searchUser();
    this.getProfileImage();
  }

  searchUser(){
    var filter = new UserFilterViewModel();
    filter.userId = this.idUserLogged;
    this.userService.getUserbyfilter(filter).subscribe((data: UserModel[]) => {
      this.user = data.find(x => x.userId === this.idUserLogged);
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los datos de usuario", "Error");
    });
  }

  saveNewPassword(){
    this.submittedPassword = true;
    if (this.acctualityPassword.trim() != "" && this.newPassword.trim() != "" && this.confirmationPassword.trim() != "" && this.acctualityPassword.trim().toLocaleLowerCase() != this.newPassword.trim().toLocaleLowerCase() && this.newPassword.trim().toLocaleLowerCase() == this.confirmationPassword.trim().toLocaleLowerCase()) {
      var usernewpassword = new UserNewPasswordModel();
      usernewpassword.acctualityPassword = this.acctualityPassword;
      usernewpassword.newPassword = this.newPassword;
      this.userService.postNewPassWordProfile(usernewpassword).subscribe((data: number) => {
        if (data > 0) {
          this.toastrservice.success("Contraseña actualizada con éxito", "Actualizado");
          this.submittedPassword = false;
          this.modalReference.close();
        }else if(data == -1){
          this.toastrservice.error("La contraseña actual es incorrecta", "Error");
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al cargar los datos de usuario", "Error");
      });
      this.submittedPassword = false;
    }
  }

  showModalChangePassword(){
    this.acctualityPassword = "";
    this.newPassword = "";
    this.confirmationPassword = "";
    this.modalReference = this.modalService.open(this.modalChangePassword);
  }

  saveUser(){
    this.submittedUser = true;
    if (this.user.firstName != "" && this.user.firstLastName != "" && this.user.mainPhone != "") {
      this.userService.postUser(this.user).subscribe((data: number) => {
        if(data > 0) {
          debugger;
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this.onSubmit();
          var filter = new UserFilterViewModel();
          filter.userId = this.idUserLogged;
          this.userService.getUserbyfilter(filter).subscribe((data: UserModel[]) => {
            var user = data.find(x => x.userId === this.idUserLogged);
            const item = {
              id: user.userId,
              fullName: user.firstName + ' ' + user.firstLastName,
              email: user.email
            };
            sessionStorage.removeItem(this.USER_STATE);
            sessionStorage.setItem(this.USER_STATE, JSON.stringify(item));
          });
          
          this.submittedUser = false;
          this.editprofile = false;
        }else{
          this.toastrservice.error("Ha ocurrido un error al guardar el usuario", "Error");
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar el usuario", "Error");
      });
    }
    
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  onSubmitt() {
    var formData: FormData = new FormData();
     formData.append('sliderFile', this.fileData, this.fileData.name)
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.base64image = reader.result.toString();
        this.previewUrl = reader.result; 
      };
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    var formData = new FormData();
    formData.append('sliderFile', this.uploadForm.get('profile').value);
    var model: ProfileViewModel = new ProfileViewModel();
    model.image = this.base64image;
    model.fileName = "";
    this.userService.postImageUpload(model).subscribe(()=>{
      //this.toastrservice.success("Se ha guardado exitosamente", "Guradado");
      window.location.reload();
    });
  }

  getProfileImage(){
    this.userService.getProfileImage().subscribe((data: ProfileViewModel) => {
      this.previewUrl = data.image;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar la imagen del perfil", "Error");
    });
  }
}
