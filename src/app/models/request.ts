import { Customer, FacilitiesEventDetails, Payment, PaymentReport, PriestRequestDetail } from "./common";

export class RequestSummary {
    requestId?: number;
    startDate?: Date;
    endDate?: Date;
    sd?: boolean;
    facilities: boolean;
    priest?: boolean;
    catering?: boolean;
    pending?: boolean;
    agreement?: boolean;	
    cancel?: boolean;
	priestStatus?: string;
	venue?: boolean;
	pujaId?: number;
	priestId?: number;
	unPaid?: boolean;
	admin?: boolean;
}
export class EventRequest {
    requestId?: number;
    customerId?: number;
    priestId?: number;
    eventDate?: Date;
    createdDate?: Date;
    startTime?: string;
    templeEvent?: string;
    eventName?: string;
    eventType?: string;
    duration?: number;	
    numPeople?: number;	
    customer?: Customer;
    priestName?: string;
    priestStatus?: string;    
    updateBy?: string;
    paid?: any;
    amount?: any;
    message?: string;
    status?: string;	
    agreement?: boolean;
    auditorium?: boolean;
    multipurpose?: boolean;
    dininghall?: boolean;
    classroom?: boolean;
    priest?: string;
    catering?: string;
    facilities?: string;
    payments?: Array<Payment> = [];
    priestDetails?: Array<PriestRequestDetail> = [];
    facilitiesDetails?: Array<FacilitiesEventDetails> = [];
}
export class GeneralRequest {
    id?: number;
    moduleId?: number;
    createdDate?: Date;
    updatedDate?: Date;
    amount?: any;
    comments?: string;
    status?: string;	
    firstName?: string;	
    lastName?: string;	
    phone?:	string;
    emailAddress?: string;	
    paymentReport?: Array<PaymentReport> = [];
}

