import { ServiceModel } from "./service";
import { SubsidiaryModel } from "./subsidiary";

export class ComanyModel{
    idCompany: number = -1;
    idCountry: number = -1;
    idState: number = -1;
    rif: string = "";
    businessName: string = "";
    socialName: string = "";
    address: string = "";
    phone: string = "";
    email: string = "";
    subsidiaries: SubsidiaryModel[];
    services: ServiceModel[];
    status: boolean = false;
}