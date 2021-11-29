import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/masters/shared/services/common/common.service';
import { DepartmentService } from 'src/app/masters/shared/services/department/department.service';
import { ServiceService } from 'src/app/masters/shared/services/services/service.service';
import { DepartmentFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/departmentfilter';
import { PriorityFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/priorityfilter';
import { RequestTypeFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/requesttypefilter';
import { ServiceFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/servicefilter';
import { DepartmentModel } from 'src/app/models/masters/department';
import { PriorityModel } from 'src/app/models/masters/priority';
import { RequestTypeModel } from 'src/app/models/masters/requesttype';
import { ServiceModel } from 'src/app/models/masters/service';
import { RequestModel } from 'src/app/models/request/request';
import { RequestGetModel } from 'src/app/models/request/requestGet';
import { RequestService } from '../shared/services/request/request.service';
import { RequestFiltesViewModel } from '../shared/viewmodels/requestfilter';
import { UserFilterViewModel } from 'src/app/security/shared/viewmodels/userfilter';
import { UserModel } from 'src/app/models/security/user';
import { UserService } from 'src/app/security/shared/service/user/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as Permissions from 'src/app/shared/utils/access';
import { UserPermissionsService } from 'src/app/security/shared/service/user/user-permissions.service';
import { LoginService } from 'src/app/security/shared/service/login.service';
import { SecurityService } from 'src/app/security/shared/service/security.service';

@Component({
  selector: 'app-panel-requests',
  templateUrl: './panel-requests.component.html',
  styleUrls: ['./panel-requests.component.scss'],
  providers: [DatePipe]
})
export class PanelRequestsComponent implements OnInit {

  requestFilter: RequestFiltesViewModel = new RequestFiltesViewModel();
  showFilters: boolean = false;
  requestTypeList: RequestTypeModel[] = [];
  serviceList: ServiceModel[] = [];
  departmentList = [] as any;
  dropdownSettings = {};
  selectedDepartment = [] as any;
  prioritiesList: PriorityModel[] = [];
  requestList: RequestGetModel[] = [];
  requestDate: Date = new Date();
  attendedDate: Date = new Date();
  userSearch: UserFilterViewModel = new UserFilterViewModel();
  userListSearch: UserModel[] = [];
  userListSearchBD: UserModel[] = [];
  submittedCancel: boolean = false;
  permissionsIDs = {...Permissions};
  listdepartments: DepartmentModel[] = [];
  userId: number;
  @ViewChild("modalUserAssing") modalUserAssing: ElementRef;
  @ViewChild("modalDetailRequest") modalDetailRequest: ElementRef;
  @ViewChild("modalConfirmFinish") modalConfirmFinish: ElementRef;
  @ViewChild("modalConfirmCancel") modalConfirmCancel: ElementRef;
  modalReference1: NgbModalRef;
  modalReference2: NgbModalRef;
  modalReference3: NgbModalRef;
  modalReference4: NgbModalRef;
  _requestEdit: RequestModel = new RequestModel();
  _requestDetail: RequestModel = new RequestModel();
  _requestCancel: RequestModel = new RequestModel();

  requestPendingList: RequestGetModel[] = [];
  requestPendingListBD: RequestGetModel[] = [];
  requestInProgressList: RequestGetModel[] = [];
  requestInProgressListBD: RequestGetModel[] = [];
  requestToFinalizeList: RequestGetModel[] = [];
  requestToFinalizeListBD: RequestGetModel[] = [];
  requestFinishedList: RequestGetModel[] = [];
  requestFinishedListBD: RequestGetModel[] = [];
  requestCanceledList: RequestGetModel[] = [];
  requestCanceledListBD: RequestGetModel[] = [];

  searchUserBool: boolean = false;
  validateModal: number = -1;
  collectionSizeRP : number = 0;
  pageRP = 1;
  pageSizeRP = 2;

  collectionSizeRIP : number = 0;
  pageRIP = 1;
  pageSizeRIP = 2;

  collectionSizeRTP : number = 0;
  pageRTP = 1;
  pageSizeRTP = 2;

  collectionSizeRF : number = 0;
  pageRF = 1;
  pageSizeRF = 2;

  collectionSizeRC : number = 0;
  pageRC = 1;
  pageSizeRC = 5;

  collectionSizeRU : number = 0;
  pageRU = 1;
  pageSizeRU = 5;

  constructor(private router: Router,
    private requestService: RequestService,
    private toastrservice: ToastrService,
    private commonService: CommonService,
    private serviceService: ServiceService,
    private departmentservice: DepartmentService,
    public datepipe: DatePipe,
    private userService: UserService,
    private modalService: NgbModal,
    public userPermissions: UserPermissionsService,
    private _loginService: LoginService,
    private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userId = Number(this._loginService.idUser);
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'Sin resultados',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
    this.searchRequestType();
    this.searchService();
    this.searchDepartments();
    this.searchPriorities();
    this.search();
  }

  newrequest(){
    this.router.navigate(['newrequest']);
  }

  clearFilters(){
    this.requestFilter = new RequestFiltesViewModel();
    this.requestDate = new Date();
    this.attendedDate = new Date();
  }

  updatedate(event){
    this.requestFilter.attendedDateS = this.datepipe.transform(event, "dd/MM/yyyy")
  }

  updaterequestdate(event){
    this.requestFilter.requestDateS = this.datepipe.transform(event, "dd/MM/yyyy")
  }

  search(){
    this.requestFilter.requestId = this.requestFilter.request == "" || this.requestFilter.request == null ? -1 : parseInt(this.requestFilter.request);
    if (this.securityService.permissionsList.find(x => x === this.permissionsIDs.CHECK_MY_REQUEST)){
      this.requestFilter.userRequestedId = this.userId;
      this.requestFilter.userAttendedId = this.userId;
    }
    if (this.userPermissions.allowed(this.permissionsIDs.CHECK_MY_REQUEST_AND_MY_DEPARTMENT)){
      var filter = new UserFilterViewModel();
      filter.userId = this.userId;
      this.userService.getUserbyfilter(filter).subscribe((data: UserModel[]) => {
        this.requestFilter.userRequestedId = this.userId;
        this.requestFilter.departmentId = data.find(x => x.userId == this.userId).departments.idDepartment;
        this.requestService.getRequestsbyfilter(this.requestFilter).subscribe((data: RequestGetModel[]) => {
          this.requestList = data;
          this.requestPendingList = data.filter(x => x.requestStatus.idStatus == 2);
          this.requestPendingListBD = data.filter(x => x.requestStatus.idStatus == 2);
          this.requestInProgressList = data.filter(x => x.requestStatus.idStatus == 1);
          this.requestInProgressListBD = data.filter(x => x.requestStatus.idStatus == 1);
          this.requestToFinalizeList = data.filter(x => x.requestStatus.idStatus == 3);
          this.requestToFinalizeListBD = data.filter(x => x.requestStatus.idStatus == 3);
          this.requestFinishedList = data.filter(x => x.requestStatus.idStatus == 4);
          this.requestFinishedListBD  = data.filter(x => x.requestStatus.idStatus == 4);
          this.requestCanceledList = data.filter(x => x.requestStatus.idStatus == 8);
          this.requestCanceledListBD = data.filter(x => x.requestStatus.idStatus == 8);
          this.collectionSizeRP = this.requestPendingListBD.length;
          this.refreshRequestPending();
          this.collectionSizeRIP = this.requestInProgressListBD.length;
          this.refreshRequestInProgress();
          this.collectionSizeRTP = this.requestToFinalizeListBD.length;
          this.refreshRequestToFinalize();
          this.collectionSizeRF = this.requestFinishedListBD.length;
          this.refreshRequestFinish();
          this.collectionSizeRC = this.requestCanceledListBD.length;
          this.refreshCanceled();
        }, (error: HttpErrorResponse)=>{
          this.toastrservice.error("Ha ocurrido un error cargando las solicitudes", "Error");
        });
      });
    }else{
      this.requestService.getRequestsbyfilter(this.requestFilter).subscribe((data: RequestGetModel[]) => {
        this.requestList = data;
        console.log(data);
        this.requestPendingList = data.filter(x => x.requestStatus.idStatus == 2);
        this.requestPendingListBD = data.filter(x => x.requestStatus.idStatus == 2);
        this.requestInProgressList = data.filter(x => x.requestStatus.idStatus == 1);
        this.requestInProgressListBD = data.filter(x => x.requestStatus.idStatus == 1);
        this.requestToFinalizeList = data.filter(x => x.requestStatus.idStatus == 3);
        this.requestToFinalizeListBD = data.filter(x => x.requestStatus.idStatus == 3);
        this.requestFinishedList = data.filter(x => x.requestStatus.idStatus == 4);
        this.requestFinishedListBD  = data.filter(x => x.requestStatus.idStatus == 4);
        this.requestCanceledList = data.filter(x => x.requestStatus.idStatus == 8);
        this.requestCanceledListBD = data.filter(x => x.requestStatus.idStatus == 8);
        this.collectionSizeRP = this.requestPendingListBD.length;
        this.refreshRequestPending();
        this.collectionSizeRIP = this.requestInProgressListBD.length;
        this.refreshRequestInProgress();
        this.collectionSizeRTP = this.requestToFinalizeListBD.length;
        this.refreshRequestToFinalize();
        this.collectionSizeRF = this.requestFinishedListBD.length;
        this.refreshRequestFinish();
        this.collectionSizeRC = this.requestCanceledListBD.length;
        this.refreshCanceled();
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error cargando las solicitudes", "Error");
      });
    }
    
  }

  searchRequestType(){
    var filters = new RequestTypeFilterViewModel();
    filters.indActivo = 1;
    this.commonService.getRequestTypesbyfilter(filters).subscribe((data: RequestTypeModel[]) => {
      this.requestTypeList = data;
      //this._productorigintypeservice._ProductorigintypeList = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los tipos de solicitudes", "Error");
    });
  }

  searchService(){
    var filters = new ServiceFilterViewModel();
    filters.status = 1;
    this.serviceService.getServicesbyfilter(filters).subscribe((data: ServiceModel[]) => {
      this.serviceList = data;
      //this._productorigintypeservice._ProductorigintypeList = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los servicios", "Error");
    });
  }

  searchDepartments(){
    var filter: DepartmentFilterViewModel = new DepartmentFilterViewModel();
    filter.status = 1;
    this.departmentservice.getDepartmentbyfilter(filter).subscribe((data: DepartmentModel[]) => {
      this.listdepartments = data;
      var listdepartment = [] as any;
      //this.departmentsList = data;
      data.forEach(element => {
        listdepartment.push({ id: element.idDepartment, text: element.name });
      });
      this.departmentList = listdepartment;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los departamentos", "Error");
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

  onItemSelectDepartment(item: any) {
  }

  onItemSelectPosition(item: any){
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  assingUserAttended(requestPending: RequestGetModel){
    this.validateModal = 1;
    this._requestEdit = new RequestModel();
    this._requestEdit.requestId = requestPending.requestId;
    this._requestEdit.service.idService = requestPending.service.idService;
    this._requestEdit.requestStatus.idStatus = requestPending.requestStatus.idStatus;
    this._requestEdit.priority.idPriority = requestPending.priority == undefined ? null : requestPending.priority.idPriority;
    this._requestEdit.reason = requestPending.reason;
    this._requestEdit.observation = requestPending.observation;
    this.userListSearch = [];
    this.userListSearchBD = [];
    this.collectionSizeRU = this.userListSearchBD.length;
    this.refreshUsers();
    this.modalReference1 = this.modalService.open(this.modalUserAssing, {size:'lg'});
  }

  assingmentAttended(requestPending: RequestGetModel){
    this._requestEdit = new RequestModel();
    this._requestEdit.requestId = requestPending.requestId;
    this._requestEdit.service.idService = requestPending.service.idService;
    this._requestEdit.requestStatus.idStatus = requestPending.requestStatus.idStatus;
    this._requestEdit.priority.idPriority = requestPending.priority == undefined ? null : requestPending.priority.idPriority;
    this._requestEdit.reason = requestPending.reason;
    this._requestEdit.observation = requestPending.observation;
    this._requestEdit.userAttendedId.userId = this.userId;
    this.requestService.postRequest( this._requestEdit).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.search();
      }
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
    });
  }

  searchUser(){
    this.searchUserBool = true;
    if (this.userSearch.email != "" || this.userSearch.identityCard != "" || this.userSearch.name != "" || this.userSearch.departmentId > 0) {
      this.userService.getUserbyfilter(this.userSearch).subscribe((data: UserModel[]) => {
        this.searchUserBool = false;
        this.userListSearch = data;
        this.userListSearchBD = data;
        this.collectionSizeRU = this.userListSearchBD.length;
        this.searchUserBool = false;
        this.refreshUsers();
    }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error cargando los usuarios", "Error");
      });
    }
    
  }

  acceptUser(user: UserModel){
    if (this.validateModal == 1) {
      this._requestEdit.userAttendedId.userId = user.userId;
      this.requestService.postRequest( this._requestEdit).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this.search();
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
      });
    }else if(this.validateModal == 2){
      this._requestDetail.userAttendedId.userId = user.userId;
      this._requestDetail.userAttendedId.firstName = user.firstName + " " + user.firstLastName;
    }else if(this.validateModal == 3){
      this.requestFilter.userAttended = user.firstName + " " + user.firstLastName;
      this.requestFilter.userAttendedId = user.userId;
    }else if(this.validateModal == 4){
      this.requestFilter.userRequested = user.firstName + " " + user.firstLastName;
      this.requestFilter.userRequestedId = user.userId;
    }
    this.modalReference1.close();
  }

  ProcessRequest(requestPending: RequestGetModel){
    this._requestEdit = new RequestModel();
    this._requestEdit.requestId = requestPending.requestId;
    this._requestEdit.service.idService = requestPending.service.idService;
    this._requestEdit.requestStatus.idStatus = 1;
    this._requestEdit.priority.idPriority = requestPending.priority == undefined ? null : requestPending.priority.idPriority;
    this._requestEdit.reason = requestPending.reason;
    this._requestEdit.observation = requestPending.observation;
    this._requestEdit.userAttendedId.userId = requestPending.userAttendedId;
    this.requestService.postRequest( this._requestEdit).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.search();
      }
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
    });
  }

  BackPending(requestInProgress: RequestGetModel){
    this._requestEdit = new RequestModel();
    this._requestEdit.requestId = requestInProgress.requestId;
    this._requestEdit.service.idService = requestInProgress.service.idService;
    this._requestEdit.requestStatus.idStatus = 2;
    this._requestEdit.priority.idPriority = requestInProgress.priority == undefined ? null : requestInProgress.priority.idPriority;
    this._requestEdit.reason = requestInProgress.reason;
    this._requestEdit.observation = requestInProgress.observation;
    this._requestEdit.userAttendedId.userId = requestInProgress.userAttendedId;
    this.requestService.postRequest( this._requestEdit).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.search();
      }
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
    });
  }

  FinishRequest(requestInProgress: RequestGetModel){
    this._requestEdit = new RequestModel();
    this._requestEdit.requestId = requestInProgress.requestId;
    this._requestEdit.service.idService = requestInProgress.service.idService;
    this._requestEdit.requestStatus.idStatus = 4;
    this._requestEdit.priority.idPriority = requestInProgress.priority == undefined ? null : requestInProgress.priority.idPriority;
    this._requestEdit.reason = requestInProgress.reason;
    this._requestEdit.observation = requestInProgress.observation;
    this._requestEdit.userAttendedId.userId = requestInProgress.userAttendedId;
    this.modalReference3 = this.modalService.open(this.modalConfirmFinish, {size:'md'});
  }

  FinishConfrimRequest(){
    this.requestService.postRequest( this._requestEdit).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.search();
      }
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
    });
  }

  OpenRequest(requestToFinalize: RequestGetModel){

  }

  ToFinalizeRequest(requestToFinalize: RequestGetModel){
    this._requestEdit = new RequestModel();
    this._requestEdit.requestId = requestToFinalize.requestId;
    this._requestEdit.service.idService = requestToFinalize.service.idService;
    this._requestEdit.requestStatus.idStatus = 3;
    this._requestEdit.priority.idPriority = requestToFinalize.priority == undefined ? null : requestToFinalize.priority.idPriority;
    this._requestEdit.reason = requestToFinalize.reason;
    this._requestEdit.observation = requestToFinalize.observation;
    this._requestEdit.userAttendedId.userId = requestToFinalize.userAttendedId;
    this.requestService.postRequest( this._requestEdit).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.search();
        this.modalReference3.close();
      }
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
    });
  }
  
  editRequest(request: RequestGetModel){
    this._requestDetail = new RequestModel();
    this._requestDetail.requestId = request.requestId;
    this._requestDetail.service.name = request.service.name;
    this._requestDetail.service.idService = request.service.idService;
    this._requestDetail.service.description = request.service.description;
    this._requestDetail.requestStatus.idStatus = request.requestStatus.idStatus;
    this._requestDetail.priority.idPriority = request.priority == undefined ? null : request.priority.idPriority;
    this._requestDetail.reason = request.reason;
    this._requestDetail.observation = request.observation;
    this._requestDetail.userRequestedId.email = request.userRequested.email;
    this._requestDetail.userAttendedId.userId = request.userAttendedId;
    this._requestDetail.userAttendedId.firstName = request.nameUserAttended;
    this._requestDetail.userRequestedId.firstName = request.nameUserRequested;
    this._requestDetail.userRequestedId.departments.name = request.userRequested.departments.name;
    this._requestDetail.userRequestedId.positions.name = request.userRequested.positions.name;
    this._requestDetail.userRequestedId.mainPhone = request.userRequested.mainPhone;
    this._requestDetail.userAttendedId.departments.name = request.userAttended == null || request.userAttended == undefined ? "" : request.userAttended.departments.name;
    this._requestDetail.userAttendedId.positions.name = request.userAttended == null || request.userAttended == undefined ? "" : request.userAttended.positions.name;
    this._requestDetail.userAttendedId.mainPhone = request.userAttended == null || request.userAttended == undefined ? "" : request.userAttended.mainPhone;
    this._requestDetail.department = request.department.name;
    this._requestDetail.nameUserRequestedInitial = request.nameUserRequestedInitial;
    this._requestDetail.phoneUserRequestedInitial = request.phoneUserRequestedInitial;
    this.modalReference2 = this.modalService.open(this.modalDetailRequest, {size:'md'});
  }

  reAssignUser(request: RequestModel){
    this.validateModal = 2;
    this.userListSearch = [];
    this.userListSearchBD = [];
    this.collectionSizeRU = this.userListSearchBD.length;
    this.refreshUsers();
    this.modalReference1 = this.modalService.open(this.modalUserAssing, {size:'lg'});
  }

  saveRequest(request: RequestModel){
    request.service.idService = parseInt(request.service.idService.toString())
    this.requestService.postRequest(request).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.search();
        this.modalReference2.close();
      }
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
    });
  }

  BackInProgress(requestToFinalize: RequestGetModel){
    this._requestEdit = new RequestModel();
    this._requestEdit.requestId = requestToFinalize.requestId;
    this._requestEdit.service.idService = requestToFinalize.service.idService;
    this._requestEdit.requestStatus.idStatus = 1;
    this._requestEdit.priority.idPriority = requestToFinalize.priority == undefined ? null : requestToFinalize.priority.idPriority;
    this._requestEdit.reason = requestToFinalize.reason;
    this._requestEdit.observation = requestToFinalize.observation;
    this._requestEdit.userAttendedId.userId = requestToFinalize.userAttendedId;
    this.requestService.postRequest( this._requestEdit).subscribe((data: number) => {
      if(data > 0) {
        this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
        this.search();
      }
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al guardar la solicitud", "Error");
    });
  }

  CancelRequest(request: RequestModel){
    this._requestCancel = request;
    this._requestCancel.observation = "";
    this.modalReference4 = this.modalService.open(this.modalConfirmCancel, {size:'md'});
  }

  ConfirmCancelRequest(){
    this.submittedCancel = true;
    if (this._requestCancel.observation.trim() != "") {
      this._requestCancel.service.idService = parseInt(this._requestCancel.service.idService.toString());
      this._requestCancel.requestStatus.idStatus = 8;
      this.requestService.postRequest(this._requestCancel).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this.search();
          this.modalReference4.close();
          this.modalReference2.close();
          this.submittedCancel = false;
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al actualizar la solicitud", "Error");
      });
    }
  }

  searchUserAttendedModal(){
    this.validateModal = 3;
    this.userSearch = new UserFilterViewModel();
    this.userListSearch = [];
    this.userListSearchBD = [];
    this.collectionSizeRU = this.userListSearchBD.length;
    this.refreshUsers();
    this.modalReference1 = this.modalService.open(this.modalUserAssing, {size:'lg'});
  }

  searchUserRequestedModal(){
    this.validateModal = 4;
    this.userSearch = new UserFilterViewModel();
    this.userListSearch = [];
    this.userListSearchBD = [];
    this.collectionSizeRU = this.userListSearchBD.length;
    this.refreshUsers();
    this.modalReference1 = this.modalService.open(this.modalUserAssing, {size:'lg'});
  }

  refreshRequestPending(){
    this.requestPendingList = this.requestPendingListBD
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.pageRP - 1) * this.pageSizeRP, (this.pageRP - 1) * this.pageSizeRP + this.pageSizeRP);
  }

  refreshRequestInProgress(){
    this.requestInProgressList = this.requestInProgressListBD
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.pageRIP - 1) * this.pageSizeRIP, (this.pageRIP - 1) * this.pageSizeRIP + this.pageSizeRIP);
  }

  refreshRequestToFinalize(){
    this.requestToFinalizeList = this.requestToFinalizeListBD
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.pageRTP - 1) * this.pageSizeRTP, (this.pageRTP - 1) * this.pageSizeRTP + this.pageSizeRTP);
  }

  refreshRequestFinish(){
    this.requestFinishedList = this.requestFinishedListBD
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.pageRF - 1) * this.pageSizeRF, (this.pageRF - 1) * this.pageSizeRF + this.pageSizeRF);
  }

  refreshCanceled(){
    this.requestCanceledList = this.requestCanceledListBD
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.pageRC - 1) * this.pageSizeRC, (this.pageRC - 1) * this.pageSizeRC + this.pageSizeRC);
  }

  refreshUsers(){
    this.userListSearch = this.userListSearchBD
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.pageRU - 1) * this.pageSizeRU, (this.pageRU - 1) * this.pageSizeRU + this.pageSizeRU);
  }
}
