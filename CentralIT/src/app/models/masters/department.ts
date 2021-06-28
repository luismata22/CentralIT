import { PositionModel } from "./position";

export class DepartmentModel{
    idDepartment: number = -1;
    idServiceDepartment: number = -1;
    name: string = "";
    description: string = "";
    positions: PositionModel[] = [];
    namePositions: string = "";
    status: boolean = false;
}