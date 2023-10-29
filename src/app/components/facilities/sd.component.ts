import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from '../common/CommonUtils';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { CommonService } from 'src/app/services/common.service';
import { FacilitiesRequest } from 'src/app/models/facilities';

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
  request?: FacilitiesRequest;


  constructor(private router: Router, private commonSrv: CommonService, private facilitiesSrv: FacilitiesService) {
    console.log('FacilitiesSDComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
    this.role = sessionStorage.getItem('role')!;
    if (this.requestId! > 0) {
      this.facilitiesSrv.getFacilitiesRequest(this.requestId!).subscribe((resp: FacilitiesRequest) => {
        this.request = resp;
      },
        error => console.log('Error :: ' + error)
      )
    } else {
      this.request = new FacilitiesRequest();
    }

  }

  onSave(modal: any): void {
    console.log(' onSave ');

  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
}