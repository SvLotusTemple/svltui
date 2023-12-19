import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from '../util/CommonUtils';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from 'src/app/services/common.service';
import { EventRequest, RequestSummary } from 'src/app/models/request';
import { Acknowledge, Puja } from 'src/app/models/common';
@Component({
  selector: 'app-priest-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class PriestHomeComponent implements OnInit {

  moduleId?: number;
  summaryReport!: EventRequest[];
  role?: string;
  reportRequest?: RequestSummary;
  startDate?: Date;
  endDate?: Date;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  dataSource: any;
  displayedColumns: string[];
  constructor(private router: Router, private commonSrv: CommonService) {
    console.log('PriestHomeComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
    this.role = sessionStorage.getItem('role')!;
    if (this.role == "ADMIN") {
      this.displayedColumns = ["id", "eventDate", "startTime", "name", "address", "phone", "service", "venue","amount","priest", "priestStatus"];
    } else{
      this.displayedColumns = ["id", "eventDate", "startTime", "name", "address", "phone", "service", "venue", "priestStatus"];
    }
  }
  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  setVenue(str: string): string{
    return ("O" == str || "N" == str) ? "Outside" : ""
  }
  ngOnInit(): void {
    let today = new Date();
    let tomorrow = new Date();
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
    this.reportRequest = new RequestSummary();
    this.reportRequest.startDate = today;
    this.reportRequest.admin = "ADMIN" == this.role;
    tomorrow.setDate(today.getDate() + 365)
    this.reportRequest.endDate = tomorrow;
    this.commonSrv.getRequestSummary(this.reportRequest!).subscribe((resp: EventRequest[]) => {
      this.summaryReport = resp;
      if (resp != null) {
        this.dataSource = new MatTableDataSource<EventRequest>(this.summaryReport);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      }
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
    this.commonSrv.getRequestSummary(this.reportRequest!).subscribe((resp: EventRequest[]) => {
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
  getAcknowledge(requestId?: number): void {
//    let acknowledge: Acknowledge = {requestId: requestId, status: 'A'};
    let acknowledge = new Acknowledge(requestId, 'A');
    this.commonSrv.getAcknowledge(acknowledge).subscribe();
  };  
}