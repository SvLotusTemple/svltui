import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtils } from '../util/CommonUtils';
import { CommonConstants } from '../util/CommonConstant';
import { PujaModel, RefModel } from 'src/app/models/reference';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { Customer, FacilitiesEventDetails, Puja } from 'src/app/models/common';
import { EventRequest} from 'src/app/models/request';
@Component({
  selector: 'app-event-request',
  templateUrl: './request.component.html',
  styleUrls: ['./customer.component.css']
})
export class EventRequestComponent implements OnInit {

  moduleId?: number;
  role?: string;
  request?: EventRequest;
  eventType?: string;
  requestId?: number;
  errorMsg?: string;
  times?: RefModel[];
  states?: RefModel[];
  priests?: RefModel[];
  pujas?: PujaModel[];
  pujaDtl?: Puja[];
  facilitiesDtl?: FacilitiesEventDetails[];
  serviceTypes?: Array<RefModel> = [];
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
  auditorium?: boolean;
  multipurpose?: boolean;
  dininghall?: boolean;
  classroom?: boolean;
  priest?: string;
  catering?: string;
  facilities?: string;
  priestName?: string;
  updateBy?: string;
  paid?: any;
  amount?: number=0;
  duration?: number;	
  numPeople?: number;	
  message?: string;
  modalMessage?: string;
  modalTitle?: string;
  isPujaExists?: Boolean;
  isFacilitiesExists?: Boolean;
  customerId?: number;
  emailButton?: Boolean;
  cancelButton?: Boolean;
  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService,private dialog: MatDialog) {
    console.log('EventRequestComponent: constructor');
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.moduleId = Number(sessionStorage.getItem('moduleId'));
    this.customerId = Number(sessionStorage.getItem('customerId'));
    this.role = sessionStorage.getItem('role')!;
    this.getTimes();
    this.getStates();
    this.getServiceTypes();
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
        this.eventType = resp.eventType; 
        this.emailAddress = resp.customer.emailAddress; 
        this.firstName = resp.customer.firstName; 
        this.lastName = resp.customer.lastName; 
        this.address = resp.customer.address; 
        this.city = resp.customer.city; 
        this.state = resp.customer.state; 
        this.zipCode = resp.customer.zipCode; 
        this.phone = resp.customer.phone; 
        this.auditorium = resp.auditorium;
        this.multipurpose = resp.multipurpose;
        this.dininghall = resp.dininghall;
        this.classroom = resp.classroom;
        this.priest = resp.priest;
        this.catering = resp.catering;
        this.facilities = resp.facilities;
        this.priestName = resp.priestName; 
        this.paid = resp.paid;
        this.amount = resp.amount;
        this.message = resp.message; 
        this.emailButton = true;
        this.cancelButton = true;
        this.duration = resp.duration; 	
        this.numPeople = resp.numPeople; 	
        if (resp.priestDetails != null) {
          this.pujaDtl = resp.priestDetails;
        }
        if (resp.facilitiesDetails != null) {
          this.facilitiesDtl = resp.facilitiesDetails;
        }
      },
        error => console.log('Error :: ' + error)
      )
    } else {
      this.requestId=0;
      this.request = new EventRequest();
      this.templeEvent = 'N';
      this.pujaDtl = [];
      this.emailButton = false;
      this.cancelButton = false;
      this.templeEvent = 'N';
      this.priest = 'N';
      this.catering = 'N';
      this.facilities = 'N';
      this.eventType = 'F'; 
    }
    if (this.customerId == -1) {
      this.request.customer = new Customer();
    }
  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  setTempleEvent(str: string): void {
    this.templeEvent = str;
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
      this.isPujaExists = false;
      for (const puja of this.pujaDtl!){
        console.log("-checking-" + puja.pujaId+" : "+puja.pujaName)+" : "+puja.amount;
        if (puja.pujaId == Number(selectId)) {
          this.isPujaExists = true;
          break;
        }
      }
    }
    if (!this.isPujaExists) {
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
          this.isPujaExists = true;
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
  setEventType(type: string) {
    this.eventType = type;
  }
  setServiceType(evnt: any, selectId: number) {
    let status = 'Y';
    if (!evnt) status = 'N';
    if (selectId==1) {
      this.catering=status;
    }else if (selectId==2) {
      this.priest=status;
    }else if (selectId==3) {
      this.facilities=status;
    }
  }
  setFacilitiesRequest(evnt: any, selectId: number) {
    if (selectId==1) {
      this.auditorium=evnt;
    }else if (selectId==2) {
      this.multipurpose=evnt;
    }else if (selectId==3) {
      this.dininghall=evnt;
    }else if (selectId==4) {
      this.classroom=evnt;
    }else if (selectId==5) {
      this.catering=evnt;
    }else if (selectId==6) {
      this.priest=evnt;
    }
    if (this.facilitiesDtl == null) {
      this.facilitiesDtl = [];
      var facilities = new FacilitiesEventDetails();
      facilities.serviceTypeId = Number(selectId);
      this.facilitiesDtl.push(facilities);
    } else {
      this.isFacilitiesExists = false;
      const deleted = []
      for (const facilities of this.facilitiesDtl){
        if (facilities.serviceTypeId !== Number(selectId)) {
          deleted.push(facilities);
        }
      }
      this.facilitiesDtl = deleted;
      if (evnt) {
        var facilities = new FacilitiesEventDetails();
        facilities.serviceTypeId = Number(selectId);
        this.facilitiesDtl.push(facilities);
      }
      
    }
    this.facilitiesDtl.forEach( r =>{
      console.log('checked', r.serviceTypeId);
    });
  }
  onSave() {
    console.log('onSave :: ' );
    if (this.customerId == -1 && (this.lastName == null || this.lastName == "")) {
      this.errorMsg = 'Please enter valid  last name';
    } else if (this.customerId == -1 && (this.firstName == null || this.firstName == "")) {
      this.errorMsg = 'Please enter valid first name';
    } else if (this.customerId == -1 && (this.phone == null || this.phone == "")) {
      this.errorMsg = 'Please enter valid phone';
    } else if (this.customerId == -1 && (this.emailAddress == null || this.emailAddress.length < 2 || this.emailAddress.indexOf('@') == -1)) {
      this.errorMsg = 'Please enter valid email address';
    } else if (this.templeEvent == null) {
      this.errorMsg = 'Please select temple event';
    } else if (this.eventDate == null) {
      this.errorMsg = 'Please select event date';
    } else if (this.startTime == null) {
      this.errorMsg = 'Please select time';
    } else if (this.customerId == -1 && (this.state == null)) {
      this.errorMsg = 'Please select state';
    } else if (this.customerId == -1 && (this.address == null)) {
      this.errorMsg = 'Please enter street';
    } else if (this.customerId == -1 && (this.city == null || this.city == "")) {
      this.errorMsg = 'Please enter city name';
    } else if (this.templeEvent=='Y' && this.numPeople == null) {
      this.errorMsg = 'Please enter number of people';
    } else if (this.templeEvent=='Y' && this.duration == null) {
      this.errorMsg = 'Please enter number of hours';
    } else if (this.priest=='Y' && !this.pujaDtl) {
      this.errorMsg = 'Please select service';
 //   } else if (this.priestId == null ) {
 //     this.errorMsg = 'Please select priest';
    } else {
      console.log('priestId :: ' + this.priestId);
      this.request!.priestId = this.priestId; 
      this.request!.eventDate = this.eventDate;  
      this.request!.startTime = this.startTime; 
      this.request!.templeEvent = this.templeEvent; 
      this.request.customerId = this.customerId;
      if (this.customerId == -1) {
        this.request!.customer.emailAddress = this.emailAddress; 
        this.request!.customer.firstName = this.firstName; 
        this.request!.customer.lastName = this.lastName; 
        this.request!.customer.address = this.address; 
        this.request!.customer.city = this.city; 
        this.request!.customer.state = this.state; 
        this.request!.customer.zipCode = this.zipCode; 
        this.request!.customer.phone = this.phone;   
      }
      this.request!.priestName = this.priestName; 
      this.request!.paid = this.paid;
      this.request!.amount = this.amount;
      this.request!.message = this.message; 
      this.request!.priestDetails = this.pujaDtl;
      this.request.eventType = this.eventType;
      this.request.auditorium = this.auditorium;
      this.request.multipurpose = this.multipurpose;
      this.request.dininghall = this.dininghall;
      this.request.classroom = this.classroom;
      this.request.priest = this.priest;
      this.request.catering = this.catering;
      this.request.facilities = this.facilities;
      this.request.duration = this.duration; 	
      this.request.numPeople = this.numPeople; 
      this.commonSrv.saveRequest(this.request!)
        .subscribe((resp: EventRequest) => {
          if (this.customerId == -1) {
            this.router.navigateByUrl('/customer/guestRequestSuccess');
          } else {
            this.router.navigateByUrl('/customer/history');
          }
        },
          error => {
            this.errorMsg = 'Invalid onSave';
            console.log('Error :: ' + this.errorMsg);
          }
        );      
    }
  }
  getServiceTypes() {
    this.commonSrv.getReference(CommonConstants.FACILITY_REF_SRV_TYP).subscribe((resp: RefModel[]) => {
      this.serviceTypes = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }  
}