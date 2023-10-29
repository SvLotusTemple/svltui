import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from '../common/CommonUtils';
import { FacilitiesRequest, FacilitiesSummaryRequest } from 'src/app/models/facilities';
import { FacilitiesService } from 'src/app/services/facilities.service';

@Component({
  selector: 'app-facilities-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class FacilitiesHomeComponent implements OnInit {
  moduleId?: number;
  role?: string;
  errorMsg?: string;
  reportRequest?: FacilitiesSummaryRequest;
  startDate?: Date;
  endDate?: Date;
  summaryReport!: FacilitiesRequest[];

  constructor(private router: Router, private facilitiesSrv: FacilitiesService) {
    console.log('FacilitiesHomeComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
        let today = new Date();
    let tomorrow = new Date();
    this.reportRequest = new FacilitiesSummaryRequest();
    this.reportRequest.startDate = today;
    tomorrow.setDate(today.getDate() + 30)
    this.reportRequest.endDate = tomorrow;
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
    this.role = sessionStorage.getItem('role')!;
    this.getSummary(this.reportRequest);
  }

  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  setStatus(str: string) {
    return CommonUtils.setStatus(str);
  }
  setYesNo(str: any){
    return CommonUtils.setYesNo(str);   
  }
  onSave(modal: any): void {

  }
  getSummary(request: FacilitiesSummaryRequest): void {
    console.log('FacilitiesHomeComponent: getSummary');
    this.facilitiesSrv.getFacilitiesSummary(request).subscribe((resp: FacilitiesSummaryRequest[]) => {
      this.summaryReport = resp;
    },
      error => console.log('Error :: ' + error)
    )
  };
  getEmailPhone(phone: string, email: string) {
    return CommonUtils.getEmailPhone(phone, email);
  };
}