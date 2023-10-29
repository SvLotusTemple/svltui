import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { PriestSummaryReport, PriestSummaryRequest } from '../models/priest';

@Injectable()
export class PriestService {
    url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }  
    savePriestRequest(request: PriestSummaryReport): Observable<PriestSummaryReport> {
        return this.http.post(this.url + 'priest/request/save',request);
    } 
    getPriestSummary(request: PriestSummaryRequest): Observable<PriestSummaryReport[]> {
        return this.http.post<PriestSummaryReport[]>(this.url + 'priest/report/summary', request);
    }
    getPriestRequest(requestId: number): Observable<PriestSummaryReport> {
        return this.http.get<PriestSummaryReport>(this.url + 'priest/findId/' + requestId);
    }
}