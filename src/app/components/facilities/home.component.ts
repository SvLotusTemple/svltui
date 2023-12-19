import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from '../util/CommonUtils';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventRequest, RequestSummary } from 'src/app/models/request';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-facilities-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class FacilitiesHomeComponent implements OnInit {
  moduleId?: number;
  role?: string;
  errorMsg?: string;
  reportRequest?: RequestSummary;
  startDate?: Date;
  endDate?: Date;
  summaryReport!: EventRequest[];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  dataSource: any;
  displayedColumns: string[] = ["id", "eventDate", "startTime", "eventName", "name", "phone", "duration", "numPeople", "amountPaid", "service", "status", "createdDate"];
  constructor(private router: Router, private commonSrv: CommonService) {
    console.log('RequestHomeComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
        let today = new Date();
    let tomorrow = new Date();
    this.reportRequest = new RequestSummary();
    this.reportRequest.startDate = today;
    tomorrow.setDate(today.getDate() + 365)
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
  setService(agr: boolean, aud: boolean, mph: boolean, priest: boolean, catering:boolean): string {
    let str: string='';
    if (agr) str = "Agreement\n";
    if (aud) str += "Auditorium\n";
    if (mph) str += "MPH\n";
    if (priest) str += "Priest\n";
    if (catering) str += "Catering\n";
    return str;
  }
  getSummary(request: RequestSummary): void {
    console.log('FacilitiesHomeComponent: getSummary');
    this.commonSrv.getRequestSummary(request).subscribe((resp: EventRequest[]) => {
      this.summaryReport = resp;
      if (resp != null) {
        this.dataSource = new MatTableDataSource<EventRequest>(this.summaryReport);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      }      
    },
      error => console.log('Error :: ' + error)
    )
  };
  getEmailPhone(phone: string, email: string) {
    return CommonUtils.getEmailPhone(phone, email);
  };
  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}