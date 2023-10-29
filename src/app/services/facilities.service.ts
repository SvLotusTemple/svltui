import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { FacilitiesRequest, FacilitiesSummaryRequest } from '../models/facilities';
import { Observable } from 'rxjs';

@Injectable()
export class FacilitiesService {
    url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }    
    getFacilitiesSummary(request: FacilitiesSummaryRequest): Observable<FacilitiesRequest[]> {
        return this.http.post<FacilitiesRequest[]>(this.url + 'facilities/report/summary', request);
    }
    getFacilitiesRequest(requestId: number): Observable<FacilitiesRequest> {
        console.log(' getFacilitiesRequest '+requestId);
        return this.http.get<FacilitiesRequest>(this.url + 'facilities/findId/' + requestId);
    } 
}