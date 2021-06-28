import { DepartmentModel } from "./department";

export class ServiceModel{
    idService: number = -1;
    name: string = "";
    description: string = "";
    department: DepartmentModel[]=[];
    nameDepartment: string = "";
    status: boolean = false;
}