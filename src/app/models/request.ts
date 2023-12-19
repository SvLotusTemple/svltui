import { Customer, FacilitiesEventDetails, Payment, PriestRequestDetail } from "./common";

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
    priest?: boolean;
    catering?: boolean;
    payments?: Array<Payment> = [];
    priestDetails?: Array<PriestRequestDetail> = [];
    facilitiesDetails?: Array<FacilitiesEventDetails> = [];
}
