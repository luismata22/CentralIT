import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { CommonService } from 'src/app/masters/shared/services/common/common.service';
import { DepartmentService } from 'src/app/masters/shared/services/department/department.service';
import { PositionService } from 'src/app/masters/shared/services/position/position.service';
import { ServiceService } from 'src/app/masters/shared/services/services/service.service';
import { DepartmentFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/departmentfilter';
import { PositionFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/positionfilter';
import { PriorityFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/priorityfilter';
import { RequestTypeFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/requesttypefilter';
import { ServiceFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/servicefilter';
import { StatusFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/statusfilter';
import { DepartmentModel } from 'src/app/models/masters/department';
import { PositionModel } from 'src/app/models/masters/position';
import { PriorityModel } from 'src/app/models/masters/priority';
import { RequestTypeModel } from 'src/app/models/masters/requesttype';
import { ServiceModel } from 'src/app/models/masters/service';
import { StatusModel } from 'src/app/models/masters/status';
import { RequestModel } from 'src/app/models/request/request';
import { UserModel } from 'src/app/models/security/user';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { UserService } from 'src/app/security/shared/service/user/user.service';
import { UserFilterViewModel } from 'src/app/security/shared/viewmodels/userfilter';
import { RequestService } from '../shared/services/request/request.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {

  basicData: boolean = true;
  workerData: boolean = false;
  companyData: boolean = false;
  confirmData: boolean = false;
  _request: RequestModel = new RequestModel();
  nextWorker: boolean;
  nextCompany: boolean;
  idUserLogged: number;
  fullNameUserLogged: string;
  serviceList: ServiceModel[] = [];
  validateRequestThird: boolean = false;
  userSearch: UserFilterViewModel = new UserFilterViewModel();
  userListSearch: UserModel[] = [];
  userListSearchBD: UserModel[] = [];
  @ViewChild("modalUserSearch") modalUserSearch: ElementRef;
  modalReference: NgbModalRef;
  validateModal: number;
  departmentsList: DepartmentModel[] = [];
  statusList: StatusModel[] = [];
  prioritiesList: PriorityModel[] = [];
  requestTypeList: RequestTypeModel[] = [];
  nextFinish: boolean;
  dropdownSettings = {};
  positionList = [] as any;
  departmentList = [] as any;
  selectedDepartment = [] as any;
  selectedPosition = [] as any;
  blocknextcompany: boolean = false;
  collectionSizeRU : number = 0;
  pageRU = 1;
  pageSizeRU = 5;
  invalidemail: boolean = false;

  constructor(private router: Router,private loginservice: LoginService,
    private serviceService: ServiceService,
    private toastrservice: ToastrService,
    private modalService: NgbModal,
    private userService: UserService,
    private departmentservice: DepartmentService,
    private commonService: CommonService,
    private positionservice: PositionService,
    private requestService: RequestService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'Sin resultados',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.idUserLogged = this.loginservice.storeUser.id;
    this.fullNameUserLogged = this.loginservice.entityName;
    if (this.fullNameUserLogged != "" && this.idUserLogged > 0) {
      this._request.fullNameUserRequest = this.fullNameUserLogged;
      this._request.idUserRequest = this.idUserLogged;
    }
    this.searchService();
    this.searchRequestType();
    this.searchDepartments();
  }

  nextworkerdata(){
    this.nextWorker = true;
    this._request.requestType.idRequestType = 1;
    if (this._request.idUserRequest > 0 && parseInt(this._request.service.idService.toString()) > 0 && parseInt(this._request.requestType.idRequestType.toString()) > 0 &&
      this._request.reason.trim() != "") {
        if (this.validateRequestThird == false) {
           var filteruser = new UserFilterViewModel();
           filteruser.userId = this.idUserLogged;
           this.userService.getUserbyfilter(filteruser).subscribe((data: UserModel[]) => {
            var user = data.find(x => x.userId == this.idUserLogged);
            this._request.userRequestedId.email = user.email;
            this._request.userRequestedId.userId = user.userId;
            this._request.userRequestedId.firstName = user.firstName;
            this._request.userRequestedId.firstLastName = user.firstLastName;
            this._request.userRequestedId.identityCard = user.identityCard;
            this._request.userRequestedId.mainPhone = user.mainPhone;
            this._request.userRequestedId.departments.idDepartment = user.departments.idDepartment;
            this._request.userRequestedId.positions.idPosition = user.positions.idPosition;
            this._request.userRequestedId.departments.name = user.departments.name;
            this._request.userRequestedId.positions.name = user.positions.name;
            this.basicData = false;
            this.workerData = true;
            this.companyData = false;
            this.confirmData = false;
          }, (error: HttpErrorResponse)=>{
            this.toastrservice.error("Ha ocurrido un error cargando los usuarios", "Error");
          });
           
        }else{
          this._request.userRequestedId.email = "";
          this._request.userRequestedId.userId = -1;
          this._request.userRequestedId.firstName = "";
          this._request.userRequestedId.firstLastName = "";
          this._request.userRequestedId.identityCard = "";
          this._request.userRequestedId.mainPhone = "";
          this._request.userRequestedId.departments.idDepartment = -1;
          this._request.userRequestedId.positions.idPosition = -1;
          this._request.userRequestedId.departments.name = "";
            this._request.userRequestedId.positions.name = "";
          this.basicData = false;
          this.workerData = true;
          this.companyData = false;
          this.confirmData = false;
        }
        
    }
  }

  ValidateRequest(){
    /* if (this.validateRequestThird == true) {
      this._request.userRequestedId.firstName = "";
      this._request.userRequestedId.userId = -1;
    }else{
      if (this.fullNameUserLogged != "" && this.idUserLogged > 0) {
        this._request.userRequestedId.firstName = this.fullNameUserLogged;
        this._request.userRequestedId.userId = this.idUserLogged;
      }
    } */
  }

  acceptUser(user: UserModel){
    this._request.userRequestedId.email = user.email;
    this._request.userRequestedId.firstName = user.firstName;
    this._request.userRequestedId.firstLastName = user.firstLastName;
    this._request.userRequestedId.userId = user.userId;
    this._request.userRequestedId.identityCard = user.identityCard;
    this._request.userRequestedId.mainPhone = user.mainPhone;
    this._request.userRequestedId.departments.idDepartment = user.departments.idDepartment;
    this._request.userRequestedId.positions.idPosition = user.positions.idPosition;
    this._request.userRequestedId.departments.name = user.departments.name;
    this._request.userRequestedId.positions.name = user.positions.name;
    this.blocknextcompany = false;
    this.modalReference.close();
  }

  searchService(){
    var filters = new ServiceFilterViewModel();
    filters.status = 1;
    this.serviceService.getServicesbyfilter(filters).subscribe((data: ServiceModel[]) => {
      this.serviceList = data;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los servicios", "Error");
    });
  }

  searchUserByEmail(){
    var filteruser = new UserFilterViewModel();
    filteruser.email = this._request.userRequestedId.email;
    if (this._request.userRequestedId.email.trim() != "" && !this.invalidemail) {
      this.userService.getUserbyfilter(filteruser).subscribe((data: UserModel[]) => {
        if (data.length > 0) {
          this.blocknextcompany = true;
          this.toastrservice.error("Este usuario ya se encuentra registrado", "Error");
        }else{
          this.blocknextcompany = false;
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error cargando los usuarios", "Error");
      });
    }
  }
  searchUserModal(){
    this.userListSearch = [];
    this.userListSearchBD = [];
    this.collectionSizeRU = this.userListSearchBD.length;
    this.userSearch = new UserFilterViewModel();
    this.refreshUsers();
    this.modalReference = this.modalService.open(this.modalUserSearch, {size:'lg'});
  }

  searchUser(){
    
    if (this.userSearch.email != "" || this.userSearch.identityCard != "" || this.userSearch.name != "") {
      this.userService.getUserbyfilter(this.userSearch).subscribe((data: UserModel[]) => {
        this.userListSearch = data;
        this.userListSearchBD = data;
        this.collectionSizeRU = this.userListSearchBD.length;
        this.refreshUsers();
      }, (error: HttpErrorResponse)=>{
          this.toastrservice.error("Ha ocurrido un error cargando los usuarios", "Error");
      });
    }
  }
  searchRequestType(){
    var filters = new RequestTypeFilterViewModel();
    filters.indActivo = 1;
    this.commonService.getRequestTypesbyfilter(filters).subscribe((data: RequestTypeModel[]) => {
      this.requestTypeList = data;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los tipos de solictudes", "Error");
    });
  }

  searchPriorities(){
    var filters = new PriorityFilterViewModel();
    filters.status = 1;
    this.commonService.getPrioritiesbyfilter(filters).subscribe((data: PriorityModel[]) => {
      this.prioritiesList = data;
      //this._productorigintypeservice._ProductorigintypeList = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando las prioridades", "Error");
    });
  }
  searchStatus(){
    var filters = new StatusFilterViewModel();
    filters.indActivo = 1;
    filters.idStatusType = 3;
    this.commonService.getStatusbyfilter(filters).subscribe((data: StatusModel[]) => {
      this.statusList = data;
      //this._productorigintypeservice._ProductorigintypeList = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los estatus", "Error");
    });
  }

  backbasicdata(){
    this.basicData = true;
    this.workerData = false;
    this.companyData = false;
    this.confirmData = false;
  }

  backworkerdata(){
    this.basicData = false;
    this.workerData = true;
    this.companyData = false;
    this.confirmData = false;
  }
  nextcompanydata(){
    this.nextCompany = true;
    if (!this.invalidemail && this._request.userRequestedId.email != "" && this._request.userRequestedId.firstName != ""
    && this._request.userRequestedId.firstLastName != "" && this._request.userRequestedId.identityCard != "" && this._request.userRequestedId.mainPhone != "") {
      if (this._request.userRequestedId.userId > 0) {
        this.searchDepartmentsSelected();
        this.chargePositionSelected(this._request.userRequestedId.departments.idDepartment);
      }
      this.nextCompany = false;
      this.basicData = false;
      this.workerData = false;
      this.companyData = true;
      this.confirmData = false;
    }
  }

  async searchDepartmentsSelected(){
    var filter: DepartmentFilterViewModel = new DepartmentFilterViewModel();
    filter.status = 1;
    this.departmentservice.getDepartmentbyfilter(filter).subscribe((data: DepartmentModel[]) => {
      var listdepartment = [] as any;
      //this.departmentsList = data;
      data.forEach(element => {
        listdepartment.push({ item_id: element.idDepartment, item_text: element.name });
      });
      this.departmentList = listdepartment;
      this.selectedDepartment = this.departmentList.filter(x => x.item_id == this._request.userRequestedId.departments.idDepartment);
    })
  }

  chargePositionSelected(idDepartment: number){
    var filter = new PositionFilterViewModel();
    filter.idDepartment = idDepartment;
    filter.status = 1;
    this.positionservice.getPositionsDepartmentsbyfilter(filter).subscribe((data: PositionModel[]) => {
      //this.positionList = data;
      var listposition = [] as any;
      data.forEach(element => {
        listposition.push({ item_id: element.idPositionDepartment, item_text: element.name, position: element.idPosition  });
      });
      this.positionList = listposition;
      this.selectedPosition = this.positionList.filter(x => x.position == this._request.userRequestedId.positions.idPosition)
      this._request.userRequestedId.positionDepartmentId = this.positionList.find(x => x.position == this._request.userRequestedId.positions.idPosition).item_id;
      this._request.userRequestedId.positions.idPositionDepartment = this._request.userRequestedId.positionDepartmentId;
    })
  }

  nextconfirmdata(){
    this._request.requestType.idRequestType = parseInt(this._request.requestType.idRequestType.toString())
    this.nextFinish = true;
    if (this._request.userRequestedId.departments.idDepartment > 0 && this._request.userRequestedId.positions.idPositionDepartment > 0) {
      this.basicData = false;
      this.workerData = false;
      this.companyData = false;
      this.confirmData = true;
    }
  }

  backcompanydata(){
    this.basicData = false;
    this.workerData = false;
    this.companyData = true;
    this.confirmData = false;
  }

  cancelnewrequest(){
    this.router.navigate(['panel-requests']);
  }

  searchDepartments(){
    var filter: DepartmentFilterViewModel = new DepartmentFilterViewModel();
    filter.status = 1;
    this.departmentservice.getDepartmentbyfilter(filter).subscribe((data: DepartmentModel[]) => {
      var listdepartment = [] as any;
      //this.departmentsList = data;
      data.forEach(element => {
        listdepartment.push({ item_id: element.idDepartment, item_text: element.name });
      });
      this.departmentList = listdepartment;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los departamentos", "Error");
    });
  }

  chargePosition(idDepartment: number){
    this.selectedPosition = [] as any;
    var filter = new PositionFilterViewModel();
    filter.idDepartment = idDepartment;
    filter.status = 1;
    this.positionservice.getPositionsDepartmentsbyfilter(filter).subscribe((data: PositionModel[]) => {
      //this.positionList = data;
      var listposition = [] as any;
      data.forEach(element => {
        listposition.push({ item_id: element.idPositionDepartment, item_text: element.name  });
      });
      this.positionList = listposition;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los cargos", "Error");
    });
  }

  onItemunSelectDepartment(item: any){
    this._request.userRequestedId.departments.idDepartment = -1;
    this.selectedPosition = [];
  }

  onItemunSelectPosition(item: any){
    this._request.userRequestedId.positions.idPositionDepartment = -1;
    this._request.userRequestedId.positionDepartmentId = -1;
  }

  onItemSelectDepartment(item: any) {
    this._request.userRequestedId.departments.idDepartment = item.item_id;
    this._request.userRequestedId.departments.name = item.item_text;
    this.chargePosition(this._request.userRequestedId.departments.idDepartment);
  }

  onItemSelectPosition(item: any){
    this._request.userRequestedId.positions.idPositionDepartment = item.item_id;
    this._request.userRequestedId.positionDepartmentId = item.item_id;
    this._request.userRequestedId.positions.name = item.item_text;
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  saveRequest(){
    if(this._request.userRequestedId.userId == -1){
      this._request.userAttendedId.userId = 0;
      this._request.userRequestedId.entityTypeId = 2;
      this._request.userRequestedId.password = "123456yyyyyyyy";
      this.userService.postUser(this._request.userRequestedId).subscribe((data: number) => {
        if(data > 0) {
          this._request.userRequestedId.userId = data;
          this._request.requestStatus.idStatus = 2;
          this._request.status = this._request.requestId == -1 ? true : this._request.status;
          this._request.service.idService = parseInt(this._request.service.idService.toString());
          this.requestService.postRequest(this._request).subscribe((data: number) => {
            if(data > 0) {
              this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
              this.router.navigate(['panel-requests']);
            }
          }, (error: HttpErrorResponse)=>{
            this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
          });
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar el usuario", "Error");
      });
    }else{
      this._request.userAttendedId.userId = 0;
      this._request.status = this._request.requestId == -1 ? true : this._request.status;
      this._request.service.idService = parseInt(this._request.service.idService.toString());
      this._request.requestStatus.idStatus = 2;
      this.requestService.postRequest(this._request).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this.router.navigate(['panel-requests']);
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
      });
    }
    
  }
  refreshUsers(){
    this.userListSearch = this.userListSearchBD
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.pageRU - 1) * this.pageSizeRU, (this.pageRU - 1) * this.pageSizeRU + this.pageSizeRU);
  }

  keyPressEmail(event) {
    var inp = String.fromCharCode(event.keyCode);
    var value = event.target.value + inp;
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)) {
      this.invalidemail = false;
    } else {
        //event.preventDefault();
        this.invalidemail = true;
    }
  }
}
