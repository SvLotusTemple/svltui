import { Payment } from "./payment";

export class FacilitiesRequest {
    id?: number;
    firstName?: string;	
    lastName?: string;	
    eventDate?: Date;	
    phone?:	string;
    email?: string;	
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    startTime?: string;
    duration?: number;	
    numPeople?: number;	
    eventName?: string;	
    eventType?: string;
    status?: string;	
    amount?: any;
    agreement?: boolean;
    createdDate?: Date;
    auditorium?: boolean;
    multipurpose?: boolean;
    dininghall?: boolean;
    classroom?: boolean;
    priest?: boolean;
    catering?: boolean;
    paid?: any;
    payments?: Array<Payment> = [];
    eventDetails?: Array<FacilitiesEventDetails> = [];
    
}
export class FacilitiesSummaryRequest {
    requestId?: number;
    startDate?: Date;
    endDate?: Date;
    sd?: boolean;
    temple?: boolean;
    priest?: boolean;
    catering?: boolean;
    pending?: boolean;
    agreement?: boolean;	
    cancel?: boolean;
}
export class FacilitiesEventDetails {

    id?: number;
	serviceTypeId?: number;	
	quantity?: number;	
	discountAmount?: any;
	amount?: any;
	totalAmount?: any;
}