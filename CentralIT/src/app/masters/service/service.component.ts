import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentModel } from 'src/app/models/masters/department';
import { PositionModel } from 'src/app/models/masters/position';
import { ServiceModel } from 'src/app/models/masters/service';
import { DepartmentService } from '../shared/services/department/department.service';
import { ServiceService } from '../shared/services/services/service.service';
import { DepartmentFilterViewModel } from '../shared/viewmodels/filters/departmentfilter';
import { ServiceFilterViewModel } from '../shared/viewmodels/filters/servicefilter';
import * as Permissions from 'src/app/shared/utils/access';
import { UserPermissionsService } from 'src/app/security/shared/service/user/user-permissions.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @ViewChild("modalService") modalPosition: ElementRef;
  modalReference: NgbModalRef;
  submitted: boolean;
  _service: ServiceModel = new ServiceModel();
  serviceFilters: ServiceFilterViewModel = new ServiceFilterViewModel();
  filter = new FormControl('');
  _serviceList : ServiceModel[];
  _serviceListDB: ServiceModel[];
  dropdownSettings = {};
  departmentList = [] as any;
  selectedDepartment = [] as any;
  collectionSize : number = 0;
  permissionsIDs = {...Permissions};
  page = 1;
  pageSize = 5;

  constructor(private modalService: NgbModal,
    private toastrservice: ToastrService,
    private serviceService: ServiceService,
    private departmentservice: DepartmentService,
    public userPermissions: UserPermissionsService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'Sin resultados',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      maxHeight: 197,
    };
    this._service = new ServiceModel();
    if (this._service.idService <= 0) {
      this._service.status = true;
    }
    this.search();
    this.searchDepartments();
  }

  showModalService(){
    this.selectedDepartment = [];
    this._service = new ServiceModel();
    this._service.status = true;
    this.modalReference = this.modalService.open(this.modalPosition);
  }

  search(){
    this.serviceFilters.status = parseInt(this.serviceFilters.status.toString());
    this.serviceService.getServicesbyfilter(this.serviceFilters).subscribe((data: ServiceModel[]) => {
      this._serviceList = data;
      this._serviceListDB = data;
      this._serviceList.forEach(element => {
        element.department.forEach(element1 => {
          if (element1.status == true) {
            element.nameDepartment  = element.nameDepartment == "" || element.nameDepartment == undefined ? element1.name : element.nameDepartment + ", " + element1.name;
          }
        });
      });
      this.collectionSize = this._serviceListDB.length;
        this.refreshServices();
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los servicios", "Error");
    });
  }

  clearFilters(){
    this.serviceFilters = new ServiceFilterViewModel();
  }

  saveService(){
    this.submitted = true;
    this._service.department = [];
    if (this._service.idService > 0) {
      debugger;
      var service = this._serviceListDB.find(x => x.idService == this._service.idService);
      //service.department.forEach(department => {
        //if (this.selectedDepartment.filter(x => x.id == department.idDepartment).length == 0) {
          var a: DepartmentModel = {
            idServiceDepartment: service.department[0].idServiceDepartment,
            idDepartment: this.selectedDepartment[0].id,
            name: "",
            description: "",
            positions: [],
            namePositions: "",
            status: service.department[0].status,
          }
          this._service.department.push(a)
        }
      //});
    //}
    if (this.selectedDepartment.length > 0) {
      this.selectedDepartment.forEach(department => {
        if (this._service.department.filter(x => x.idDepartment == department.id).length == 0) {
          var a: DepartmentModel = {
            idServiceDepartment: -1,
            idDepartment: department.id,
            name: "",
            description: "",
            positions: [],
            namePositions: "",
            status: true,
          }
          this._service.department.push(a);
        }
      });
    }
    if (this._service.name.trim() != "") {
      this.serviceService.postService(this._service).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this._service = new ServiceModel();
          this._service.status = true;
          this.search();
          this.submitted = false;
          this.modalReference.close();
        }else if(data == -1){
          this.toastrservice.error("El servicio ya se encuentra registrado", "Error");
        }else{
          this.toastrservice.error("Ha ocurrido un error al guardar el servicio", "Error");
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar el servicio", "Error");
      });
    }
  }

  searchDepartments(){
    var filter: DepartmentFilterViewModel = new DepartmentFilterViewModel();
    filter.status = 1;
    this.departmentservice.getDepartmentbyfilter(filter).subscribe((data: DepartmentModel[]) => {
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

  editService(idService: number, service: string,description:string, status: boolean, departments: DepartmentModel[]){
    this._service = new ServiceModel();
    this._service.idService = idService;
    this._service.name = service;
    this._service.description = description;
    this._service.status = status;
    this.selectedDepartment = [];
    departments.forEach(element => {
      if (element.status == true) {
        this.selectedDepartment.push({ id: element.idDepartment, text: element.name, idServiceDepartment: element.idServiceDepartment, status: element.status });
      }
    });
    this.modalReference = this.modalService.open(this.modalPosition);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  refreshServices(){
    this._serviceList = this._serviceListDB
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
