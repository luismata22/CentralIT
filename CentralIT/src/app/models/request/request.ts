import { DepartmentModel } from "../masters/department";
import { PositionModel } from "../masters/position";
import { PriorityModel } from "../masters/priority";
import { RequestTypeModel } from "../masters/requesttype";
import { ServiceModel } from "../masters/service";
import { StatusModel } from "../masters/status";
import { UserModel } from "../security/user";

export class RequestModel{
    requestId: number = -1;
    userRequestedId: UserModel = new UserModel();
    userAttendedId: UserModel = new UserModel();
    requestStatus: StatusModel = new StatusModel();
    requestType: RequestTypeModel = new RequestTypeModel();
    priority: PriorityModel = new PriorityModel();
    service: ServiceModel = new ServiceModel();
    companyId: number = -1;
    subsidiaryId: number = -1;
    positionDepartmentId: number = -1;
    idUserRequest: number = -1;
    fullNameUserRequest: string = "";
    reason: string = "";
    observation: string = "";
    status: boolean = false;
    requestDate: Date = new Date();
    attendedDate: Date = new Date();
    department: string = "";
    nameUserRequestedInitial: string = "";
    phoneUserRequestedInitial: string = "";
}