import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentModel } from 'src/app/models/masters/department';
import { PositionModel } from 'src/app/models/masters/position';
import { UserPermissionsService } from 'src/app/security/shared/service/user/user-permissions.service';
import { DepartmentService } from '../shared/services/department/department.service';
import { DepartmentFilterViewModel } from '../shared/viewmodels/filters/departmentfilter';
import * as Permissions from 'src/app/shared/utils/access';
import { PositionService } from '../shared/services/position/position.service';
import { PositionFilterViewModel } from '../shared/viewmodels/filters/positionfilter';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [NgbModal, NgbActiveModal]
})
export class DepartmentComponent implements OnInit {

  @ViewChild("modalDepartment") modalDepartment: ElementRef;
  modalReference: NgbModalRef;
  submitted: boolean;
  limitSelection = false;
  positionList = [] as any;
  selectedPositions = [] as any;
  dropdownSettings = {};
  dropdownFilterSettings = {};
  positionFilterList = [] as any;
  selectedPositionsFilter = [] as any;
  departmentFilter: DepartmentFilterViewModel = new DepartmentFilterViewModel();
  filter = new FormControl('');
  _departament: DepartmentModel = new DepartmentModel();
  _departmentList : DepartmentModel[] = [];
  _departmentListBD : DepartmentModel[] = [];
  permissionsIDs = {...Permissions};
  collectionSize : number = 0;
  page = 1;
  pageSize = 5;

  constructor(private modalService: NgbModal,
    private toastrservice: ToastrService,
    public departmentService: DepartmentService,
    public userPermissions: UserPermissionsService,
    private positionservice: PositionService) { 
      
    }

  ngOnInit(): void {
    this._departament = new DepartmentModel();
    if (this._departament.idDepartment <= 0) {
      this._departament.status = true;
    }
    /* this.positionFilterList = [
      { item_idd: 1, item_textt: 'Mumbai' }
    ]; */
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'Sin resultados',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownFilterSettings = {
      singleSelection: true,
      idField: 'item_idd',
      textField: 'item_textt',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'Sin resultados',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.search();
    this.searchPositions();
  }

  showModalDepartment(){
    this._departament = new DepartmentModel();
    this._departament.status = true;
    this.selectedPositions = [];
    this.modalReference = this.modalService.open(this.modalDepartment);
    /* this.modalService.open(AddDepartamentComponent, {
      size: 'md',
    }); */
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  search(){
    this.departmentFilter.idPosition = -1;
    this.departmentFilter.status = parseInt(this.departmentFilter.status.toString());
    if (this.selectedPositionsFilter.length > 0) {
      this.selectedPositionsFilter.forEach(position => {
        this.departmentFilter.idPosition = position.item_idd;
      });
    }
    this.departmentService.getDepartmentbyfilter(this.departmentFilter).subscribe((data: DepartmentModel[]) => {
      this._departmentList = data;//.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      this._departmentListBD = data;
      this._departmentList.forEach(element => {
        element.positions.forEach(element1 => {
          if (element1.status == true) {
            element.namePositions  = element.namePositions == "" || element.namePositions == undefined ? element1.name : element.namePositions + ", " + element1.name;
          }
        });
        this.collectionSize = this._departmentListBD.length;
        this.refreshCountries();
      });
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los departamentos", "Error");
    });
  }

  clearFilters(){
    this.selectedPositionsFilter = [];
    this.departmentFilter = new DepartmentFilterViewModel();
    
  }

  getDepartment(){
    return this._departament;
  }

  editDepartment(idDepartment: number, department: string, description: string, status: boolean, positions: PositionModel[]){
    this.selectedPositions = [];
    this._departament = new DepartmentModel();
    this._departament.idDepartment = idDepartment;
    this._departament.name = department;
    this._departament.description = description;
    this._departament.status = status;
    positions.forEach(element => {
      if (element.status == true) {
        this.selectedPositions.push({ item_id: element.idPosition, item_text: element.name, idPositionDepartment: element.idPositionDepartment, status: element.status });
      }
    });
    this.modalReference = this.modalService.open(this.modalDepartment);
    /* this.modalService.open(AddDepartamentComponent, {
      size: 'md',
    }); */
  }

  saveDepartment(){
    this._departament.positions = [];
    if (this._departament.idDepartment > 0) {
      var department = this._departmentListBD.find(x => x.idDepartment == this._departament.idDepartment);
      department.positions.forEach(position => {
        if (this.selectedPositions.filter(x => x.item_id == position.idPosition).length == 0) {
          var p: PositionModel = {
            idPositionDepartment: position.idPositionDepartment,
            idPosition: position.idPosition,
            name: "",
            description: "",
            status: !position.status
          }
          this._departament.positions.push(p)
        }else{
          var p: PositionModel = {
            idPositionDepartment: position.idPositionDepartment,
            idPosition: position.idPosition,
            name: "",
            description: "",
            status: position.status == false ? true : position.status,
          }
          this._departament.positions.push(p)
        }
      });
    }
    if (this.selectedPositions.length > 0) {
      this.selectedPositions.forEach(position => {
        if (this._departament.positions.filter(x => x.idPosition == position.item_id).length == 0) {
          var p: PositionModel = {
            idPositionDepartment: -1,
            idPosition: position.item_id,
            name: "",
            description: "",
            status: true
          }
          this._departament.positions.push(p)
        }
        
      });
    }
    this.submitted = true;
    if (this._departament.name.trim() != "" && this._departament.positions.length > 0) {
      this.departmentService.postDepartment(this._departament).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this._departament = new DepartmentModel();
          this._departament.status = true;
          this.search();
          this.submitted = false;
          this.closeModal();
        }else if(data == -1){
          this.toastrservice.error("El departamento ya se encuentra registrado", "Error");
        }else{
          this.toastrservice.error("Ha ocurrido un error al guardar el departamento", "Error");
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar el departamento", "Error");
      });
    }
  }

  closeModal(){
    this.modalReference.close();
  }

  searchPositions(){
    var filter = new PositionFilterViewModel();
    filter.status = 1;
    this.positionservice.getPositionsbyfilter(filter).subscribe((data: PositionModel[]) => {
      var listfilterposition = [] as any;
      data.forEach(element => {
        this.positionList.push({ item_id: element.idPosition, item_text: element.name });
        listfilterposition.push({ item_idd: element.idPosition, item_textt: element.name });
      });
      this.positionFilterList = listfilterposition;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los departamentos", "Error");
    });
  }

  refreshCountries() {
    this._departmentList = this._departmentListBD
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
