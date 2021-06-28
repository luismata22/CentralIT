import { DepartmentModel } from "../masters/department";
import { PositionModel } from "../masters/position";
import { PriorityModel } from "../masters/priority";
import { RequestTypeModel } from "../masters/requesttype";
import { ServiceModel } from "../masters/service";
import { StatusModel } from "../masters/status";
import { UserModel } from "../security/user";

export class RequestGetModel{
    requestId: number = -1;
    nameUserRequested: string = "";
    userAttendedId: number = -1;
    nameUserAttended: string = "";
    userRequested: UserModel = new UserModel();
    userAttended: UserModel = new UserModel();
    nameUserRequestedInitial: string = "";
    phoneUserRequestedInitial: string = "";
    requestStatus: StatusModel = new StatusModel();
    requestType: RequestTypeModel = new RequestTypeModel();
    priority: PriorityModel = new PriorityModel();
    service: ServiceModel = new ServiceModel();
    department: DepartmentModel = new DepartmentModel();
    position: PositionModel = new PositionModel();
    reason: string = "";
    observation: string = "";
    status: boolean = false;
    requestDate: Date = new Date();
    attendedDate: Date = new Date();
    finishDate: Date = new Date();
}