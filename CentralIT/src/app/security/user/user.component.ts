import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/masters/shared/services/department/department.service';
import { PositionService } from 'src/app/masters/shared/services/position/position.service';
import { DepartmentFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/departmentfilter';
import { PositionFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/positionfilter';
import { DepartmentModel } from 'src/app/models/masters/department';
import { PositionModel } from 'src/app/models/masters/position';
import { RoleModel } from 'src/app/models/security/role';
import { UserModel } from 'src/app/models/security/user';
import { UserPermissionsService } from '../shared/service/user/user-permissions.service';
import { UserService } from '../shared/service/user/user.service';
import { UserFilterViewModel } from '../shared/viewmodels/userfilter';
import * as Permissions from 'src/app/shared/utils/access';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  submitted: boolean;
  @ViewChild("modalAssignRole") modalDepartment: ElementRef;
  @ViewChild("modalChangePassword") modalChangePassword: ElementRef;
  modalReference: NgbModalRef;
  modalReference1: NgbModalRef;
  filter = new FormControl('');
  userFilter: UserFilterViewModel = new UserFilterViewModel();
  userList: UserModel[] = [];
  userListBD: UserModel[] = [];
  _userAsssignRole: UserModel = new UserModel();
  _userChangePassword: UserModel = new UserModel();
  roleList: RoleModel[] = [];
  departmentsList: DepartmentModel[] = [];
  positionList: PositionModel[] = [];
  submittedPassword: boolean = false;
  collectionSize : number = 0;
  permissionsIDs = {...Permissions};
  page = 1;
  pageSize = 5;
  showFilters: boolean = false;


  constructor(private router: Router,
    private userService: UserService,
    private toastrservice: ToastrService,
    private modalService: NgbModal,
    private departmentservice: DepartmentService,
    private positionservice: PositionService,
    public userPermissions: UserPermissionsService) { }

  ngOnInit(): void {
    this.search();
    this.searchDepartments();
    this.searchPosition();
  }

  newuser(){
    this.router.navigate(['newuser',-1]);
  }

  clearFilters(){
    this.userFilter = new UserFilterViewModel();
  }

  search(){
    this.userFilter.status = parseInt(this.userFilter.status.toString());
    this.userService.getUserbyfilter(this.userFilter).subscribe((data: UserModel[]) => {
      this.userList = data;
      this.userListBD = data;
      this.collectionSize = this.userListBD.length;
      this.refreshUsers();
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los usuarios", "Error");
    });
  }

  editUser(userId: number){
    this.router.navigate(['newuser',userId]);
  }

  assingRole(userId: number, firstName: string, firstLastName: string, idRol: number){
    this._userAsssignRole = new UserModel();
    this._userAsssignRole.userId = userId;
    this._userAsssignRole.firstName = firstName;
    this._userAsssignRole.firstLastName = firstLastName;
    this._userAsssignRole.roles = new RoleModel();
    this._userAsssignRole.roles.idRole = idRol;
    this.searchRole();
    this.modalReference = this.modalService.open(this.modalDepartment);
  }

  saveRoleUser(){
    //this._userAsssignRole.idRole == this._userAsssignRole.roles.idRole;
    this._userAsssignRole.roles.idRole = parseInt(this._userAsssignRole.roles.idRole.toString());
    this.userService.postRoleUser(this._userAsssignRole).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.modalReference.close();
        this.submitted = false;
      }
      this.search();
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar el rol", "Error");
    });
  }

  searchRole(){
    this.userService.getRolesbyfilter().subscribe((data: RoleModel[]) => {
      console.log(data);
      this.roleList = data;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los roles", "Error");
    });
  }
  
  searchDepartments(){
    var filter: DepartmentFilterViewModel = new DepartmentFilterViewModel();
    filter.status = 1;
    this.departmentservice.getDepartmentbyfilter(filter).subscribe((data: DepartmentModel[]) => {
      this.departmentsList = data;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los departamentos", "Error");
    });
  }

  searchPosition(){
    var filter = new PositionFilterViewModel();
    filter.status = 1;
    this.positionservice.getPositionsbyfilter(filter).subscribe((data: PositionModel[]) => {
      this.positionList = data;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los cargos", "Error");
    });
  }

  changePassword(user: UserModel){
    this._userChangePassword = new UserModel();
    this._userChangePassword.userId = user.userId;
    this._userChangePassword.firstName = user.firstName;
    this._userChangePassword.firstLastName = user.firstLastName;
    this.modalReference1 = this.modalService.open(this.modalChangePassword);
  }

  saveNewPassword(){
    this.submittedPassword = true;
    if (this._userChangePassword.password != "" && this._userChangePassword.password.length >= 6) {
      this.userService.postNewPassWord(this._userChangePassword).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this.modalReference1.close();
          this.submittedPassword = false;
        }
        this.search();
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar el rol", "Error");
      });
    }
  }

  refreshUsers(){
    this.userList = this.userListBD
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
