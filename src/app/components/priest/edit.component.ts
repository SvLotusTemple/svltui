import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonUtils } from '../util/CommonUtils';
import { PujaModel, RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../util/CommonConstant';
import { MatDialog } from '@angular/material/dialog';
import { Puja } from 'src/app/models/common';
import { EventRequest } from 'src/app/models/request';

@Component({
  selector: 'app-priest-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./home.component.css']
})
export class PriestEditComponent implements OnInit {

  moduleId?: number;
  role?: string;
  request?: EventRequest;
  requestId?: number;
  errorMsg?: string;
  times?: RefModel[];
  states?: RefModel[];
  priests?: RefModel[];
  pujas?: PujaModel[];
  pujaDtl?: Puja[];
  priestId?: number;
  eventDate?: Date;
  createdDate?: Date;
  startTime?: string;
  templeEvent?: string;
  emailAddress?: string;
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
  amount?: number=0;
  message?: string;
  modalMessage?: string;
  modalTitle?: string;
  isExists?: Boolean;
  emailButton?: Boolean;
  cancelButton?: Boolean;
  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService,private dialog: MatDialog) {
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
      this.commonSrv.getRequest(this.requestId!).subscribe((resp: EventRequest) => {
        this.request = resp;
//        console.log('startTime :: ' + resp.startTime)+"==State:"+resp.state;
        this.priestId = resp.priestId; 
        this.eventDate = resp.eventDate;  
        this.startTime = resp.startTime; 
        this.templeEvent = resp.templeEvent; 
        this.emailAddress = resp.customer.emailAddress; 
        this.firstName = resp.customer.firstName; 
        this.lastName = resp.customer.lastName; 
        this.address = resp.customer.address; 
        this.city = resp.customer.city; 
        this.state = resp.customer.state; 
        this.zipCode = resp.customer.zipCode; 
        this.phone = resp.customer.phone; 
        this.priestName = resp.priestName; 
        this.paid = resp.paid;
        this.amount = resp.amount;
        this.message = resp.message; 
        this.emailButton = true;
        this.cancelButton = true;
        if (resp.priestDetails != null) {
          this.pujaDtl = resp.priestDetails;
        }

      },
        error => console.log('Error :: ' + error)
      )
    } else {
      this.requestId=0;
      this.request = new EventRequest();
      this.request.templeEvent = 'Y';
      this.templeEvent = 'Y';
      this.pujaDtl = [];
      this.emailButton = false;
      this.cancelButton = false;
    }

  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  setTempleEvent(str: string): void {
    if (str=='T') {
      this.templeEvent = 'Y';
    } else {
      this.templeEvent = 'N';
    }
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
    console.log("-setState-" + selectId);
    this.state = selectId;
  }
  onDeletePuja(selectId: number) {
    const deleted = []
    this.amount = 0;
    for (const puja of this.pujaDtl!){
      if (puja.pujaId !== Number(selectId)) {
        this.amount+=puja.amount;
        deleted.push(puja);
      }
    }
    this.pujaDtl = deleted;
  }
  onSelectedPuja(selectId: string) {
    console.log("-onSelectedPuja-" + selectId);
    if (this.pujaDtl == null) {
      this.pujaDtl = [];
    } else {
      this.isExists = false;
      for (const puja of this.pujaDtl!){
        console.log("-checking-" + puja.pujaId+" : "+puja.pujaName)+" : "+puja.amount;
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
          puja.pujaHours = p.pujaHours;
          puja.pujaName = p.pujaName;
          puja.amount = this.templeEvent ? p.amount : p.outsideAmount;
          this.pujaDtl.push(puja);
          console.log("--" + puja.pujaId+" : "+puja.pujaName+" : "+puja.amount);
          this.amount+=puja.amount;
          console.log("Amount+: " + this.amount);
          this.isExists = true;
          break;
        }
      }
  
    }
  }
  openDialog(templateRef: TemplateRef<any>, selectedId: number) {
    this.dialog.open(templateRef);
    this.modalMessage="";
    this.modalTitle= selectedId==1 ? "Cancel" : "Email";
    console.log('--' + selectedId);
  }
  onModalSubmit() {
    console.log('--' + this.modalTitle);
    this.dialog.closeAll();
  }
  onSave() {
    console.log('onSave :: ' );
    if (this.lastName == null || this.lastName == "") {
      this.errorMsg = 'Please enter valid  last name';
    } else if (this.firstName == null || this.firstName == "") {
      this.errorMsg = 'Please enter valid first name';
    } else if (this.phone == null || this.phone == "") {
      this.errorMsg = 'Please enter valid phone';
    } else if (this.emailAddress == null || this.emailAddress.length < 2 || this.emailAddress.indexOf('@') == -1) {
      this.errorMsg = 'Please enter valid email address';
    } else if (this.templeEvent == null) {
      this.errorMsg = 'Please select temple event';
    } else if (this.eventDate == null) {
      this.errorMsg = 'Please select event date';
    } else if (this.startTime == null) {
      this.errorMsg = 'Please select time';
    } else if (this.state == null ) {
      this.errorMsg = 'Please select state';
    } else if (this.address == null ) {
      this.errorMsg = 'Please enter street';
    } else if (this.city == null || this.city == "") {
      this.errorMsg = 'Please enter city name';
    } else if (!this.pujaDtl || !this.pujaDtl.length) {
      this.errorMsg = 'Please select service';
 //   } else if (this.priestId == null ) {
 //     this.errorMsg = 'Please select priest';
    } else {
      console.log('priestId :: ' + this.priestId);
      this.request!.priestId = this.priestId; 
      this.request!.eventDate = this.eventDate;  
      this.request!.startTime = this.startTime; 
      this.request!.templeEvent = this.templeEvent; 
//      this.request!.emailAddress = this.emailAddress; 
//      this.request!.firstName = this.firstName; 
//      this.request!.lastName = this.lastName; 
//     this.request!.address = this.address; 
//      this.request!.city = this.city; 
//      this.request!.state = this.state; 
//      this.request!.zipCode = this.zipCode; 
//      this.request!.phone = this.phone; 
      this.request!.priestName = this.priestName; 
      this.request!.paid = this.paid;
      this.request!.amount = this.amount;
      this.request!.message = this.message; 
      this.request!.priestDetails = this.pujaDtl;
      this.commonSrv.saveRequest(this.request!)
        .subscribe((resp: EventRequest) => {
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