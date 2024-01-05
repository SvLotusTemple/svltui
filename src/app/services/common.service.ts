import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/user';
import { JwtResponse } from '../models/user';
import { UpdatePassword } from '../models/user';
import { PujaModel, RefModel} from '../models/reference';
import { User } from '../models/user';
import { UploadFileRequest } from '../models/upload';
import { EventRequest, GeneralRequest, RequestSummary } from '../models/request';
import { Acknowledge, Customer, EmailRequest, Payment, PaymentReport, PaymentSummaryRequest } from '../models/common';

@Injectable()
export class CommonService {
    url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url + 'user/findUsers');
    }

    getUser(selectedId: number): Observable<User> {
        return this.http.get<User>(this.url + 'user/findId/' + selectedId);
    }

    validateLogin(user: LoginRequest, isCustomer: boolean): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.url + (isCustomer? 'login/customer/validate' : 'login/validate'), user);
    }
    validateKey(key: string, type: string): Observable<JwtResponse> {
        return this.http.get<JwtResponse>(this.url + type+'/verify/'+key);
    }
    changePassword(updatePassword: UpdatePassword): Observable<boolean> {
        return this.http.post<boolean>(this.url + 'login/changePassword', updatePassword);
    }
    saveUser(user: User): Observable<User> {
        return this.http.post<User>(this.url + 'user/update', user);
    }
    deleteUser(selectedId: number) {
        this.http.get(this.url + 'user/delete/' + selectedId);
    }
// file upload
    saveFileAchive(fileId: number) {
        return this.http.get(this.url + 'upload/archive/' + fileId);
    }
    getFiles(): Observable<User[]> {
        return this.http.get<User[]>(this.url + 'upload/list');
    }
    uploadFile(file: any): void {
        const options = {
            headers: {
              "Content-Type": "undefined"
            }} as any;
        this.http.post<any>(this.url + 'upload/file', file, options)
        .toPromise()
    .catch((e) => {
      // handle me
    });
    }
    saveFile(file: UploadFileRequest): Observable<Boolean> {
        return this.http.post<Boolean>(this.url + 'upload/file/savefile', file);
    }
    deleteFile(hashCd: string) {
        return this.http.get(this.url + 'upload/delete/' + hashCd);
    }
    // reference
    getReference(reference: string): Observable<RefModel[]> {
        return this.http.get<RefModel[]>(this.url + 'api/reference/'+reference);
    }
    getPujas(): Observable<PujaModel[]> {
        return this.http.get<PujaModel[]>(this.url + 'api/reference/puja/findAll');
    }   
    getPuja(selectedId: number): Observable<PujaModel> {
        return this.http.get<PujaModel>(this.url + 'api/reference/puja/findId/' + selectedId);
    }
    saveReferencePuja(obj: PujaModel): Observable<PujaModel> {
        return this.http.post<PujaModel>(this.url + 'reference/puja/save', obj);
    } 

    // request
    getRequestSummary(request: RequestSummary): Observable<EventRequest[]> {
        return this.http.post<EventRequest[]>(this.url + 'request/summary', request);
    }

    getRequest(requestId: number): Observable<EventRequest> {
        //       console.log(' getFacilitiesRequest '+requestId);
        return this.http.get<EventRequest>(this.url + 'request/findId/' + requestId);
    }
    saveRequest(request: EventRequest): Observable<EventRequest> {
        if (request.customerId==-1) {
            return this.http.post(this.url + 'login/guest/request/save', request);
        }
        return this.http.post(this.url + 'request/save', request);
    }
    getGeneralRequest(requestId: number): Observable<GeneralRequest> {
        //       console.log(' getgeneralRequest '+requestId);
        return this.http.get<GeneralRequest>(this.url + 'request/general/findId/' + requestId);
    }
    saveGeneralRequest(request: GeneralRequest): Observable<GeneralRequest> {
        return this.http.post(this.url + 'request/general/save', request);
    }

    getAcknowledge(acknowledge: Acknowledge): Observable<Boolean> {
       return this.http.post<Boolean>(this.url + 'priest/acknowledge', acknowledge);
    }

    // customer edit
    getCustomer(customerId: number): Observable<Customer> {
        return this.http.get<Customer>(this.url + 'login/customer/findId/' + customerId);
    }
    saveCustomer(request: Customer): Observable<Customer> {
        return this.http.post(this.url + 'login/customer/save', request);
    }
    customerHistory(): Observable<EventRequest[]> {
        return this.http.get<EventRequest[]>(this.url + 'request/history');
    }
    // payment
    getPaymentlink(key: String): Observable<GeneralRequest> {
        return this.http.get<GeneralRequest>(this.url + 'payment/paymentlink/' + key);
    }
    getPaymentSummary(request: PaymentSummaryRequest): Observable<PaymentReport[]> {
        return this.http.post<PaymentReport[]>(this.url + 'report/general/summary', request);
    }
    sendPaymentLink(payment: Payment) {
        return this.http.post(this.url + 'payment/sendPaymentLink', payment);
    }
    saveCreditcard(payment: Payment): Observable<Boolean> {
        return this.http.post<Boolean>(this.url + 'payment/save/credit', payment);
    }
    //email
    sendEmail(request: EmailRequest) {
        return this.http.post(this.url + 'api/sendemail', request);
    }

}