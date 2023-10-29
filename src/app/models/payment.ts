export class Payment {
    id?: number;
    moduleId?: number;
    sourceId?: number;
    amount?: any;
    paymentMode?: string; // check chk or cash cash or cc 
    paymentType?: string; // sd or final or donation
    createdDate?: Date;
}