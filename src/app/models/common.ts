export class PaymentReport {
    id?: number;
    moduleId?: number;
    sourceId?: number;
    amount?: any;
    paymentMode?: string; // check chk or cash cash or cc 
    paymentType?: string; // sd or final or donation
    createdDate?: Date;
}
export class FileRequest {
    moduleId?: number;
    fileName?: string;
    blob?: string;
    message?: string;
    fileType?: string;
}
export class FacilitiesEventDetails {
    id?: number;
    serviceTypeId?: number;
    quantity?: number;
    discountAmount?: any;
    amount?: any;
    totalAmount?: any;
}
export class Customer {
    id?: number;
    firstName?: string;	
    lastName?: string;	
    phone?:	string;
    emailAddress?: string;	
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}
export class PriestRequestDetail {
    id?: number;
    priestRequestId?: number;
    pujaId?: number;
    amount?: any;
    pujaHours?: number;
    pujaName?: string;
}
export class Puja {
    pujaId?: number;
    pujaHours?: number;
    amount?: any;
    pujaName?: string;
}
export class Acknowledge {
    requestId?: number;
    status?: string;
    constructor(requestId?: number, status?: string) {
        this.requestId = requestId;
        this.status = status;
    }
}
export class Payment {
    moduleId?: number;
    sourceId?: number;
    amount?: any;
    paymentMode?: string; // check chk or cash cash or cc 
    phone?:	string;
    emailAddress?: string;	
    nameOnCard?: string;	
    number?: string;	
    expiryDate?: string;	
    cvv?: string;	
}
export class PaymentSummaryRequest {
    moduleId?: number;
    startDate?: Date;
    endDate?: Date;
}
