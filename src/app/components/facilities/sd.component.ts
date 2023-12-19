import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from '../util/CommonUtils';
import { CommonService } from 'src/app/services/common.service';
import { EventRequest } from 'src/app/models/request';

@Component({
  selector: 'app-facilities-sd',
  templateUrl: './sd.component.html',
  styleUrls: ['./home.component.css']
})
export class FacilitiesSDComponent implements OnInit {
  moduleId?: number;
  role?: string;
  errorMsg?: string;
  message?: string;
  requestId?: number;
  request?: EventRequest;


  constructor(private router: Router, private commonSrv: CommonService) {
    console.log('FacilitiesSDComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
    this.role = sessionStorage.getItem('role')!;
    if (this.requestId! > 0) {
      this.commonSrv.getRequest(this.requestId!).subscribe((resp: EventRequest) => {
        this.request = resp;
      },
        error => console.log('Error :: ' + error)
      )
    } else {
      this.request = new EventRequest();
    }

  }

  onSave(modal: any): void {
    console.log(' onSave ');

  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
}