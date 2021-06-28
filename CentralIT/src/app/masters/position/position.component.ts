import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserPermissionsService } from 'src/app/security/shared/service/user/user-permissions.service';
import { PositionModel } from 'src/app/models/masters/position';
import { PositionService } from '../shared/services/position/position.service';
import * as Permissions from 'src/app/shared/utils/access';
import { PositionFilterViewModel } from '../shared/viewmodels/filters/positionfilter';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  @ViewChild("modalPosition") modalPosition: ElementRef;
  modalReference: NgbModalRef;
  submitted: boolean;
  _position: PositionModel = new PositionModel();
  positionFilter: PositionFilterViewModel = new PositionFilterViewModel();
  filter = new FormControl('');
  _positionList : PositionModel[];
  _positionListDB : PositionModel[];
  permissionsIDs = {...Permissions};
  collectionSize : number = 0;
  page = 1;
  pageSize = 5;

  constructor(private modalService: NgbModal,
    private toastrservice: ToastrService,
    private positionService: PositionService,
    public userPermissions: UserPermissionsService) { }

  ngOnInit(): void {
    this._position = new PositionModel();
    if (this._position.idPosition <= 0) {
      this._position.status = true;
    }
    this.search();
  }

  showModalPosition(){
    this._position = new PositionModel();
    this._position.status = true;
    this.modalReference = this.modalService.open(this.modalPosition);
  }

  search(){
    this.positionFilter.status = parseInt(this.positionFilter.status.toString());
    this.positionService.getPositionsbyfilter(this.positionFilter).subscribe((data: PositionModel[]) => {
      this._positionList = data;
      this._positionListDB = data;
      this.collectionSize = this._positionListDB.length;
        this.refreshPositions();
    }, (error: HttpErrorResponse)=>{
      this.toastrservice.error("Ha ocurrido un error cargando los cargos", "Error");
    });
  }

  clearFilters(){
    this.positionFilter = new PositionFilterViewModel();
  }

  savePosition(){
    //.activeModal.close('Save click');
    this.submitted = true;
    if (this._position.name.trim() != "") {
      this.positionService.postPosition(this._position).subscribe((data: number) => {
        if(data > 0) {
          this.toastrservice.success("Se ha guardado exitosamente", "Guardado");
          this._position = new PositionModel();
          this._position.status = true;
          this.positionService.getPositionsbyfilter().subscribe((data: PositionModel[]) => {
            this._positionList = data;
            this._positionListDB = data;
            this.collectionSize = this._positionListDB.length;
            this.refreshPositions();
            //this._productorigintypeService._ProductorigintypeList = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
          });
          this.submitted = false;
          this.modalReference.close();
        }else if(data == -1){
          this.toastrservice.error("El cargo ya se encuentra registrado", "Error");
        }else{
          this.toastrservice.error("Ha ocurrido un error al guardar el cargo", "Error");
        }
      }, (error: HttpErrorResponse)=>{
        this.toastrservice.error("Ha ocurrido un error al guardar el cargo", "Error");
      });
    }
  }

  editPosition(idPodition: number, position: string,description: string, status: boolean){
    this._position = new PositionModel();
    this._position = {
      idPositionDepartment: 0,
      idPosition: idPodition,
      name: position,
      description: description,
      status: status
    }
    this.modalReference = this.modalService.open(this.modalPosition);
  }

  refreshPositions() {
    this._positionList = this._positionListDB
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
