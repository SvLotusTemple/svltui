import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriestSummaryReport, PriestSummaryRequest, Puja } from 'src/app/models/priest';
import { PriestService } from 'src/app/services/priest.service';
import { CommonUtils } from '../common/CommonUtils';
@Component({
  selector: 'app-priest-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class PriestHomeComponent implements OnInit {

  moduleId?: number;
  summaryReport!: PriestSummaryReport[];
  role?: string;
  reportRequest?: PriestSummaryRequest;
  startDate?: Date;
  endDate?: Date;

  constructor(private router: Router, private priestSrv: PriestService) {
    console.log('PriestHomeComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    let today = new Date();
    let tomorrow = new Date();
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
    this.role = sessionStorage.getItem('role')!;
    this.reportRequest = new PriestSummaryRequest();
    this.reportRequest.startDate = today;
    tomorrow.setDate(today.getDate() + 30)
    this.reportRequest.endDate = tomorrow;
    this.priestSrv.getPriestSummary(this.reportRequest!).subscribe((resp: PriestSummaryReport[]) => {
      this.summaryReport = resp;
    },
      error => console.log('Error :: ' + error)
    )
    this.getSummary();
  }
  getAddress(address: string, city: string, state: string, zip: string) {
    return CommonUtils.getAddress(address, city, state, zip);
  }
  onSave(modal: any): void {
    console.log(' onSave ');
    this.getSummary();
  }
  getSummary(): void {
    console.log('PriestHomeComponent: getSummary');
    this.priestSrv.getPriestSummary(this.reportRequest!).subscribe((resp: PriestSummaryReport[]) => {
      this.summaryReport = resp;
    },
      error => console.log('Error :: ' + error)
    )
  };
  getEmailPhone(phone: string, email: string) {
    return CommonUtils.getEmailPhone(phone, email);
  }
  getService(services: Puja[]) : string {
    var str = "";
    if (services != null) {

      for (const p of services) {
        str += p.pujaName!+"\n";
      }
    }
    return str;
  }
}