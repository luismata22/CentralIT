import { DepartmentModel } from "src/app/models/masters/department";
import { ServiceModel } from "src/app/models/masters/service";

export class DepartmentServiceViewModel{
    department: DepartmentModel = new DepartmentModel();
    service: ServiceModel = new ServiceModel();
}