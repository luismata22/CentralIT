import { DepartmentService } from "src/app/masters/shared/services/department/department.service";
import { DepartmentModel } from "../masters/department";
import { PositionModel } from "../masters/position";
import { RoleModel } from "./role";

export class UserModel{
    userId: number = -1;
    entityTypeId: number = -1;
    departmentId: number = -1;
    positionDepartmentId: number = -1;
    identityCard: string = "";
    firstName: string = "";
    secondName: string = "";
    firstLastName: string = "";
    secondLastName: string = "";
    mainPhone: string = "";
    secondaryPhone: string = "";
    email: string = "";
    password: string = "";
    roles: RoleModel = new RoleModel();
    departments: DepartmentModel = new DepartmentModel();
    positions: PositionModel = new PositionModel();
    status: boolean = false;
}