import { UserModel } from "src/app/models/security/user";

export class RequestFiltesViewModel{
    request: string = "";
    requestId: number = -1;
    userRequested: string = "";
    userAttended: string = "";
    userRequestedId: number = -1;
    userAttendedId: number = -1;
    requestTypeId: number = -1;
    priorityId: number = -1;
    serviceId: number = -1;
    departmentId: number = -1;
    attendedDateS: string = "01/01/1900";
    requestDateS: string = "01/01/1900";
    status: number = -1;
}