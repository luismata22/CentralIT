import { DatePipe, formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/masters/shared/services/common/common.service';
import { DepartmentService } from 'src/app/masters/shared/services/department/department.service';
import { ServiceService } from 'src/app/masters/shared/services/services/service.service';
import { DepartmentFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/departmentfilter';
import { ServiceFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/servicefilter';
import { StatusFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/statusfilter';
import { DepartmentModel } from 'src/app/models/masters/department';
import { ServiceModel } from 'src/app/models/masters/service';
import { StatusModel } from 'src/app/models/masters/status';
import { RequestModel } from 'src/app/models/request/request';
import { RequestGetModel } from 'src/app/models/request/requestGet';
import { UserModel } from 'src/app/models/security/user';
import { UserService } from 'src/app/security/shared/service/user/user.service';
import { UserFilterViewModel } from 'src/app/security/shared/viewmodels/userfilter';
import { RequestService } from '../shared/services/request/request.service';
import { ReportFilterViewModel } from '../shared/viewmodels/reportfilter';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [DatePipe]
})
export class ReportComponent implements OnInit {

  reportfilter: ReportFilterViewModel = new ReportFilterViewModel();
  serviceList: ServiceModel[] = [];
  fromDate: Date = new Date();
  toDate: Date = new Date();
  departmentList: DepartmentModel[] = [];
  dropdownSettings = {};
  selectedDepartment = [] as any;
  reportRequestList: RequestGetModel[] = [];
  reportRequestListDB: RequestGetModel[] = [];
  @ViewChild("modalUserAssing") modalUserAssing: ElementRef;
  modalReference1: NgbModalRef;
  userSearch: UserFilterViewModel = new UserFilterViewModel();
  userListSearch: UserModel[] = [];
  userListSearchBD: UserModel[] = [];
  searchUserBool: boolean = false;
  validateModal: number = -1;
  statusList: StatusModel[] = [];
  departmentsListDB: DepartmentModel[] = [];
  notassigneduserattended: boolean = false;

  collectionSizeRU : number = 0;
  pageRU = 1;
  pageSizeRU = 5;

  collectionSize : number = 0;
  page = 1;
  pageSize = 5;

  constructor(public datepipe: DatePipe,
    private serviceService: ServiceService,
    private toastrservice: ToastrService,
    private departmentservice: DepartmentService,
    private requestService: RequestService,
    private userService: UserService,
    private modalService: NgbModal,
    private commonService: CommonService) { }

  ngOnInit(): void {
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
    this.searchService();
    this.searchDepartments();
    this.search();
    this.searchStatus();
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

  searchDepartments(){
    var filter: DepartmentFilterViewModel = new DepartmentFilterViewModel();
    filter.status = 1;
    this.departmentservice.getDepartmentbyfilter(filter).subscribe((data: DepartmentModel[]) => {
      this.departmentsListDB = data;
      /* var listdepartment = [] as any;
      
      data.forEach(element => {
        listdepartment.push({ id: element.idDepartment, text: element.name });
      });
      this.departmentList = listdepartment; */
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los departamentos", "Error");
    });
  }

  updatefrom(event){
    var frm = formatDate(event, 'yyyy-MM-dd', 'en_US');
    var to = formatDate(this.toDate, 'yyyy-MM-dd', 'en_US');
    if (to < frm) {
      this.toastrservice.error("La fecha desde tiene que mayor a la fecha hasta", "Error");
      this.toDate = new Date();
    }else{
      this.reportfilter.from = this.datepipe.transform(event, "dd/MM/yyyy");
    }
  }

  updateto(event){
    var frm = formatDate(this.fromDate, 'yyyy-MM-dd', 'en_US');
    var to = formatDate(event, 'yyyy-MM-dd', 'en_US');
    if (to < frm) {
      this.toastrservice.error("La fecha desde tiene que mayor a la fecha hasta", "Error");
      this.fromDate = new Date();
    }else{
      this.reportfilter.to = this.datepipe.transform(event, "dd/MM/yyyy")
    }
  }

  onItemSelectDepartment(item: any) {

  }
  onSelectAll(items: any) {
    console.log(items);
  }

  clearFilters(){
    this.reportfilter = new ReportFilterViewModel();
    this.toDate = new Date();
    this.fromDate = new Date();
    this.selectedDepartment = [];
  }

  search(){
    this.reportfilter.departmentId = -1;
    if (this.selectedDepartment.length > 0) {
      this.selectedDepartment.forEach(department => {
        this.reportfilter.departmentId = department.id;
      });
    }
    this.reportfilter.requestId = this.reportfilter.request == "" || this.reportfilter.request == null ? -1 : parseInt(this.reportfilter.request);
    this.requestService.getReportRequestsbyfilter(this.reportfilter).subscribe((data: RequestGetModel[]) => {
      this.reportRequestList = data;
      this.reportRequestListDB  = data;
      this.collectionSize = this.reportRequestListDB.length;
      this.refreshReport();
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando las solicitudes", "Error");
    });
  }

  acceptUser(user: UserModel){
    if(this.validateModal == 1){
      this.reportfilter.userAttended = user.firstName + " " + user.firstLastName;
      this.reportfilter.userAttendedId = user.userId;
    }else if(this.validateModal == 2){
      this.reportfilter.userRequested = user.firstName + " " + user.firstLastName;
      this.reportfilter.userRequestedId = user.userId;
    }
    this.modalReference1.close();
  }

  searchUser(){
    this.searchUserBool = true;
    if (this.userSearch.email != "" || this.userSearch.identityCard != "" || this.userSearch.name != "") {
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

  refreshUsers(){
    this.userListSearch = this.userListSearchBD
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.pageRU - 1) * this.pageSizeRU, (this.pageRU - 1) * this.pageSizeRU + this.pageSizeRU);
  }
  
  refreshReport(){
    this.reportRequestList = this.reportRequestListDB
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  searchUserAttendedModal(){
    this.validateModal = 1;
    this.userSearch = new UserFilterViewModel();
    this.userListSearch = [];
    this.userListSearchBD = [];
    this.collectionSizeRU = this.userListSearchBD.length;
    this.refreshUsers();
    this.notassigneduserattended = false;
    this.modalReference1 = this.modalService.open(this.modalUserAssing, {size:'lg'});
  }

  searchUserRequestedModal(){
    this.validateModal = 2;
    this.userSearch = new UserFilterViewModel();
    this.userListSearch = [];
    this.userListSearchBD = [];
    this.collectionSizeRU = this.userListSearchBD.length;
    this.refreshUsers();
    this.modalReference1 = this.modalService.open(this.modalUserAssing, {size:'lg'});
  }

  exportPdf() {
    var cols = [['Solicitud','Departamento','Solicitante','Cargo solicitante','Atendida por','Estatus','Fecha solictud','Fecha atención','Fecha finalización']]
    var list = this.reportRequestListDB.map(lstItem=>{
      var itm:Array<string> = [];
      cols.forEach(col => {
        itm.push(lstItem.requestId.toString() + " " + lstItem.service.name)
        itm.push(lstItem.department.name)
        itm.push(lstItem.nameUserRequested)
        itm.push(lstItem.position.name)
        itm.push(lstItem.nameUserAttended)
        itm.push(lstItem.requestStatus.name)
        itm.push(this.datepipe.transform(lstItem.requestDate, "dd/MM/yyyy") == "01/01/0001" || this.datepipe.transform(lstItem.requestDate, "dd/MM/yyyy") == "01/01/1900" ? "No posee" : this.datepipe.transform(lstItem.requestDate, "dd/MM/yyyy"))
        itm.push(this.datepipe.transform(lstItem.attendedDate, "dd/MM/yyyy") == "01/01/0001" || this.datepipe.transform(lstItem.attendedDate, "dd/MM/yyyy") == "01/01/1900" ? "No posee" : this.datepipe.transform(lstItem.attendedDate, "dd/MM/yyyy"))
        itm.push(this.datepipe.transform(lstItem.finishDate, "dd/MM/yyyy") == "01/01/0001" || this.datepipe.transform(lstItem.finishDate, "dd/MM/yyyy") == "01/01/1900" ? "No posee" : this.datepipe.transform(lstItem.finishDate, "dd/MM/yyyy"))
      });
      return itm;
    })
    const doc = new jsPDF('p', 'pt');
    // @ts-ignore
    doc.autoTable({
      head: cols,
      body: list,
    });
    doc.save('Reporte-Solicitudes.pdf');
  }

  searchStatus(){
    var filters = new StatusFilterViewModel();
    filters.indActivo = 1;
    filters.idStatusType = 2;
    this.commonService.getStatusbyfilter(filters).subscribe((data: StatusModel[]) => {
      this.statusList = data;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los estatus", "Error");
    });
  }



  ChargeDepartments(){
    var department = this.serviceList.find(x => x.idService == this.reportfilter.serviceId).department;
    //var listdepartment = [] as any;
      
      department.forEach(element => {
        this.departmentList.push(element);
      });
      this.reportfilter.departmentId = department[0].idDepartment;
    //this.departmentList = listdepartment;
  }

  userAttendedNotAssigned(){
    if(this.notassigneduserattended == true){
      this.reportfilter.userAttended = "No asignado";
      this.reportfilter.userAttendedId = 0;
      this.modalReference1.close();
    }
  }
}
