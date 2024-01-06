import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from '../util/CommonUtils';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from 'src/app/services/common.service';
import { EventRequest, GeneralRequest } from 'src/app/models/request';
import { Payment, PaymentSummaryRequest } from 'src/app/models/common';
@Component({
  selector: 'app-lotusacademy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./lotusacademy.component.css']
})
export class LotusAcademyHomeComponent implements OnInit {

  moduleId?: number;
  summaryReport!: GeneralRequest[];
  amount?: string;
  phone?: string;
  emailAddress?: string;
  paymentRequest?: PaymentSummaryRequest;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  dataSource: any;
  displayedColumns: string[];
  constructor(private router: Router, private commonSrv: CommonService) {
    console.log('LotusAcademyHomeComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
    this.displayedColumns = ["id", "date", "name","phone", "emailAddress", "amount", "status"];
  }
  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  ngOnInit(): void {
    let today = new Date();
    let daysAgo = new Date();
    this.paymentRequest = new Payment();
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
   
    daysAgo.setDate(today.getDate() - 365)
    this.paymentRequest.startDate = daysAgo;
    this.paymentRequest.endDate = today;
    this.paymentRequest.moduleId = this.moduleId;
    console.log('LotusAcademyHomeComponent: ngOnInit '+this.moduleId+" : "+daysAgo+" : "+this.paymentRequest.endDate);
    this.getSummary();
  }

  onSave(modal: any): void {
    console.log(' onSave ');
    this.getSummary();
  }
  getSummary(): void {
    this.commonSrv.getPaymentSummary(this.paymentRequest!).subscribe((resp: GeneralRequest[]) => {
      this.summaryReport = resp;
      if (resp != null) {
        this.dataSource = new MatTableDataSource<EventRequest>(this.summaryReport);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      }
    },
      error => console.log('Error :: ' + error)
    )
  }
  getEmailPhone(phone: string, email: string) {
    return CommonUtils.getEmailPhone(phone, email);
  }
  getMonthDate(date: Date) {
    return CommonUtils.convertMonDay(date);
  }
  getPaymentStatus(selectedId: number) {
    
    let val = this.summaryReport.filter(x => x.id == selectedId)[0].payments;

    if (val != null) {
      return 'Paid';
    } else {
      return 'Pending';
    }
  }
}