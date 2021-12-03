import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/masters/shared/services/department/department.service';
import { PositionService } from 'src/app/masters/shared/services/position/position.service';
import { DepartmentFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/departmentfilter';
import { PositionFilterViewModel } from 'src/app/masters/shared/viewmodels/filters/positionfilter';
import { DepartmentModel } from 'src/app/models/masters/department';
import { DocumentTypes } from 'src/app/models/masters/documenttype';
import { PositionModel } from 'src/app/models/masters/position';
import { UserModel } from 'src/app/models/security/user';
import { UserService } from '../../shared/service/user/user.service';
import { UserFilterViewModel } from '../../shared/viewmodels/userfilter';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  submitted: boolean;
  _user: UserModel = new UserModel();
  documentTypeList:DocumentTypes[] = [];
  departmentsList: DepartmentModel[] = [];
  idUser: number = 0;
  positionList = [] as any;
  departmentList = [] as any;
  selectedDepartment = [] as any;
  selectedPosition = [] as any;
  dropdownSettings = {};
  invalidemail: boolean = false;
  confirmationPassword: string = "";

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private toastrservice: ToastrService,
    private departmentservice: DepartmentService,
    private positionservice: PositionService) {
      this.idUser = this.actRoute.snapshot.params['id'];
    }

  async ngOnInit() {
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
    this.searchDocumentType();
    if (this.idUser <= 0) {
      this.searchDepartments();
      this._user.entityTypeId = 1;
      this._user.status = true;
    }else{
      this.searchUser();
    }
  }

  backUserList(){
    this.router.navigate(['users']);
  }

  validateEmail(input){
    
  }

  saveUser(){
    this.submitted = true;
    if (!this.invalidemail && this._user.identityCard.trim() != "" && this._user.firstName.trim() != "" && this._user.firstLastName.trim() != "" && 
    this._user.departments.idDepartment > 0 && this._user.positionDepartmentId > 0 && this._user.mainPhone.trim() != "" &&
    this._user.email.trim() != "" && this._user.password.trim() != "" && this._user.password.length >= 6 && this._user.password.trim() == this.confirmationPassword.trim()) {
      this._user.entityTypeId = 2;
      this._user.departmentId = parseInt(this._user.departmentId.toString())
      this._user.positionDepartmentId = parseInt(this._user.positionDepartmentId.toString())
      this.userService.postUser(this._user).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          if (this.idUser <= 0) {
            this.router.navigate(['users']);
          }
          this.submitted = false;
        }else if(data == -1){
          this.toastrservice.error("El usuario ya se encuentra registrado", "Error");
        }else{
          this.toastrservice.error("Ha ocurrido un error al guardar el usuario", "Error");
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar el usuario", "Error");
      });
    }
  }

  async searchDocumentType(){
    this.userService.getDocumentType().subscribe((data: DocumentTypes[]) => {
      this.documentTypeList = data;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar las tipos de documentos", "Error");
    });
  }

  async searchDepartments(){
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
      this.selectedDepartment = this.departmentList.filter(x => x.item_id == this._user.departments.idDepartment);
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los departamentos", "Error");
    });
  }

  searchUser(){
    var filter = new UserFilterViewModel();
    filter.userId = this.idUser;
    this.userService.getUserbyfilter().subscribe((data: UserModel[]) => {
      this._user = data.find(x => x.userId == this.idUser);
      this.searchDepartmentsSelected();
      this.chargePositionSelected(this._user.departments.idDepartment);
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar el usuario", "Error");
    });
  }

  chargePosition(idDepartment: number){
    this._user.departments.idDepartment = idDepartment;
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
      console.log(this.positionList)
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los cargos", "Error");
    });
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
      this.selectedPosition = this.positionList.filter(x => x.position == this._user.positions.idPosition)
      this._user.positionDepartmentId = this.positionList.find(x => x.position == this._user.positions.idPosition).item_id;
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error al cargar los cargos", "Error");
    });
  }
  onItemSelectDepartment(item: any) {
    this._user.departmentId = item.item_id;
    this.chargePosition(this._user.departmentId)
  }

  onItemSelectPosition(item: any){
    this._user.positionDepartmentId = item.item_id;
  }
  onSelectAll(items: any) {
    console.log(items);
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

  onItemNotSelected(){
    if (this.searchDepartments.length == 0) {
      this.selectedPosition = [];
    }
  }
}
