import { Payment } from "./payment";

export class PriestRequest {
    moduleId?: number;
    fileName?: string;
    blob?: string;
    message?: string;
    fileType?: string;
}
export class PriestSummaryRequest {
    requestId?: number;
    pujaId?: number;
    priestId?: number;
    startDate?: Date;
    endDate?: Date;
    venue?: boolean;
    unPaid?: boolean;
}
export class PriestSummaryReport {
    requestId?: number;
    priestId?: number;
    pujaDate?: Date;
    createdDate?: Date;
    startTime?: string;
    templeEvent?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
    priestName?: string;
    updateBy?: string;
    paid?: any;
    amount?: any;
    message?: string;
    payments?: Array<Payment> = [];
    priestDetails?: Array<PriestRequestDetail> = [];

}
export class PriestRequestDetail {
    id?: number;
    priestRequestId?: number;
    pujaId?: number;
    amount?: any;
    pujaName?: string;
}
export class Puja {
    pujaId?: number;
    hours?: number;
    amount?: any;
    pujaName?: string;
}
