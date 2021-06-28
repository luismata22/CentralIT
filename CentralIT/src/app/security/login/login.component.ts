import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseError } from 'src/app/models/common/errors/baseerror';
import { LoginModel } from 'src/app/models/security/login';
import { LoginService } from '../shared/service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showForgotPwt: boolean = false;
  loginForm: FormGroup;
  loginInvalid: boolean = false;
  rememberMe: boolean = false;
  private formSubmitAttempt: boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private toastrservice: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.rememberMe = false;
    this.onChange();
  }

  fortgotPassword(){
    this.showForgotPwt = true;
  }

  BackLogIn(){
    this.showForgotPwt = false;
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const credentials = new LoginModel();
        credentials.password = this.loginForm.controls.password.value;
        credentials.email = this.loginForm.controls.email.value;
        credentials.rememberMe = this.rememberMe;
        this.doLogin(credentials);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  private doLogin(credentialsVM: LoginModel) {
    let credentials: LoginModel;
    credentials = {
      password: credentialsVM.password,
      email: credentialsVM.email,
      rememberMe: credentialsVM.rememberMe
    };
    this.loginservice.login(credentials)
      .subscribe(result => {
        
        if (result) {
          var url = this.router.url.replace('login', 'panel-requests');
          //this.router.navigate(['dashboard']);
          document.location.href = url;
          this.loginInvalid = false;
        } else {
          this.loginInvalid = true;
        }
      },
      (error: BaseError) => {
        this.loginInvalid = true;
        //this.router.navigate(['dashboard']);
        this.toastrservice.error(error.ErrorMsg == undefined ? "Credenciales inválidas" : error.ErrorMsg, "Autenticación");
      });
  }

  onChangeRememberMe() {
    this.loginservice.updateRememberMe(!this.rememberMe);
    this.rememberMe = !this.rememberMe;
  }

  onChange(): void {
    this.loginForm.valueChanges.subscribe( () => {
      if (this.loginInvalid) {
        this.loginInvalid = false;
      }
    });
  }
  
}
