import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonUtils } from '../common/CommonUtils';
import { PriestService } from 'src/app/services/priest.service';
import { PriestSummaryReport, Puja } from 'src/app/models/priest';
import { PujaModel, RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../common/CommonConstant';

@Component({
  selector: 'app-priest-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./home.component.css']
})
export class PriestEditComponent implements OnInit {

  moduleId?: number;
  role?: string;
  request?: PriestSummaryReport;
  requestId?: number;
  errorMsg?: string;
  times?: RefModel[];
  states?: RefModel[];
  priests?: RefModel[];
  pujas?: PujaModel[];
  pujaDtl?: Puja[];
  priestId?: number;
  pujaDate?: Date;
  createdDate?: Date;
  startTime?: string;
  templeEvent?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  priestName?: string;
  updateBy?: string;
  paid?: any;
  amount?: any;
  message?: string;
  modalMessage?: string;
  modalTitle?: string;
  isExists?: Boolean;
  constructor(private router: Router, private route: ActivatedRoute, private priestSrv: PriestService, private commonSrv: CommonService) {
    console.log('PriestEditComponent: constructor');
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.moduleId = Number(sessionStorage.getItem('moduleId'));
    this.role = sessionStorage.getItem('role')!;
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
    this.getTimes();
    this.getStates();
    if (this.role != null) {
      this.getPriests();
    }
    this.getPujas();
  }

  ngOnInit(): void {

    if (this.requestId! > 0) {
      this.priestSrv.getPriestRequest(this.requestId!).subscribe((resp: PriestSummaryReport) => {
        this.request = resp;
        console.log('startTime :: ' + resp.startTime);
        this.priestId = resp.priestId; 
        this.pujaDate = resp.pujaDate;  
        this.startTime = resp.startTime; 
        this.templeEvent = resp.templeEvent; 
        this.email = resp.email; 
        this.firstName = resp.firstName; 
        this.lastName = resp.lastName; 
        this.address = resp.address; 
        this.city = resp.city; 
        this.state = resp.state; 
        this.zipCode = resp.zipCode; 
        this.phone = resp.phone; 
        this.priestName = resp.priestName; 
        this.paid = resp.paid;
        this.amount = resp.amount;
        this.message = resp.message; 
//        this.setTime(this.startTime!);
      },
        error => console.log('Error :: ' + error)
      )
    } else {
      this.request = new PriestSummaryReport();
      this.request.templeEvent = "Y";
      this.templeEvent = "Y";
      this.pujaDtl = [];
      const puja = new Puja();
      puja.pujaId = 0;
      this.pujaDtl.push(puja);
    }

  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  setTempleEvent(str: string): void {
    this.templeEvent = str;
    this.request!.templeEvent = this.templeEvent;
  }
  getPriest() {
    return this.priestId+"";
  }
  setPriest(str: string) {
    console.log('setPriest :: ' + str+" : "+Number(str))
    this.priestId = Number(str);
  }
  getTimes() {
    this.commonSrv.getReference(CommonConstants.REF_TIME).subscribe((resp: RefModel[]) => {
      this.times = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }
  getStates() {
    this.commonSrv.getReference(CommonConstants.REF_ST).subscribe((resp: RefModel[]) => {
      this.states = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }
  getPujas() {
    this.commonSrv.getPujas().subscribe((resp: PujaModel[]) => {
      this.pujas = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }
  getPriests() {
    this.commonSrv.getReference(CommonConstants.PRIEST_USER).subscribe((resp: RefModel[]) => {
      this.priests = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }
  setTime(selectId: string) {
//    this.request!.startTime = selectId;
    console.log("setTime: " + selectId);
    this.startTime = selectId;
  }
  setState(selectId: string) {
    this.request!.state = selectId;
  }
  onDeletePuja(selectId: string) {
    for (const puja of this.pujaDtl!){
      console.log("-checking-" + puja.pujaId+" : "+puja.pujaName);
      if (puja.pujaId == Number(selectId)) {
        this.pujaDtl!.pop();
      }
    }
  }
  onSelectedPuja(selectId: string) {
    if (this.pujaDtl == null) {
      this.pujaDtl = [];
    } else {
      this.isExists = false;
      for (const puja of this.pujaDtl!){
        console.log("-checking-" + puja.pujaId+" : "+puja.pujaName);
        if (puja.pujaId == Number(selectId)) {
          this.isExists = true;
          break;
        }
      }
    }
    if (!this.isExists) {
      console.log("--" + selectId);
      for (const p of this.pujas!) {
        if (p.id == Number(selectId)) {
          var puja = new Puja();
          puja.pujaId = p.id;
          puja.hours = p.pujaHours;
          puja.pujaName = p.pujaName;
          puja.amount = this.templeEvent == 'Y' ? p.amount : p.outsideAmount;
          this.pujaDtl.push(puja);
          console.log("--" + puja.pujaId+" : "+puja.pujaName);
          break;
        }
      }
  
    }
  }
  onModalSubmit(modal: any) {
    console.log('--' + this.modalTitle);
    modal.hide();
  }
  onModal(selectedId: number) {
    this.modalMessage="";
    this.modalTitle= selectedId==1 ? "Cancel" : "Email";
    console.log('--' + selectedId);
  }
  onSave() {
    
    if (this.request!.lastName == null || this.request!.lastName == "") {
      this.errorMsg = 'Please enter valid  last name';
    } else if (this.request!.firstName == null || this.request!.firstName == "") {
      this.errorMsg = 'Please enter valid first name';
    } else if (this.request!.phone == null || this.request!.phone == "") {
      this.errorMsg = 'Please enter valid phone';
    } else if (this.request!.email == null || this.request!.email.length < 2 || this.request!.email.indexOf('@') == -1) {
      this.errorMsg = 'Please enter valid email address';
    } else if (this.request!.templeEvent == null) {
      this.errorMsg = 'Please select temple event';
    } else if (this.request!.pujaDate == null) {
      this.errorMsg = 'Please select event date';
    } else if (this.request!.startTime == null) {
      this.errorMsg = 'Please select time';
    } else if (this.request!.state == null ) {
      this.errorMsg = 'Please select state';
    } else if (this.request!.address == null ) {
      this.errorMsg = 'Please enter street';
    } else if (this.request!.city == null || this.request!.city == "") {
      this.errorMsg = 'Please enter city name';
    } else if (this.request!.priestDetails == null) {
      this.errorMsg = 'Please select service';
    } else {
      if (this.pujaDtl != null) {
        this.request!.priestDetails[this.pujaDtl!.length];

        for (let i = 0; i < this.pujaDtl!.length; i++) {
          if (this.pujaDtl![i].pujaId!>0) {
            console.log("ptd: "+this.pujaDtl![i].pujaId);
            this.request!.priestDetails.push(this.pujaDtl![i]);
          }
        }
  
      }
      console.log('priestId :: ' + this.priestId);
      this.request!.priestId = this.priestId; 
      this.request!.pujaDate = this.pujaDate;  
      this.request!.startTime = this.startTime; 
      this.request!.templeEvent = this.templeEvent; 
      this.request!.email = this.email; 
      this.request!.firstName = this.firstName; 
      this.request!.lastName = this.lastName; 
      this.request!.address = this.address; 
      this.request!.city = this.city; 
      this.request!.state = this.state; 
      this.request!.zipCode = this.zipCode; 
      this.request!.phone = this.phone; 
      this.request!.priestName = this.priestName; 
      this.request!.paid = this.paid;
      this.request!.amount = this.amount;
      this.request!.message = this.message; 
      this.priestSrv.savePriestRequest(this.request!)
        .subscribe((resp: PriestSummaryReport) => {
          this.router.navigateByUrl('/priest/home');
        },
          error => {
            this.errorMsg = 'Invalid onSave';
            console.log('Error :: ' + this.errorMsg);
          }
        );      
    }
  }
}