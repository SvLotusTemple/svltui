import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtils } from '../util/CommonUtils';
import { CommonService } from 'src/app/services/common.service';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../util/CommonConstant';
import { MatDialog } from '@angular/material/dialog';
import { FacilitiesEventDetails, Payment } from 'src/app/models/common';
import { EventRequest } from 'src/app/models/request';

@Component({
  selector: 'app-facilities-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./home.component.css']
})
export class FacilitiesEditComponent implements OnInit {
  moduleId?: number;
  role?: string;
  errorMsg?: string;
  message?: string;
  requestId?: number;
  customerId?: number;
  request?: EventRequest;

  firstName?: string;
  lastName?: string;
  eventDate?: Date;
  phone?: string;
  emailAddress?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  startTime?: string;
  duration?: number;
  numPeople?: number;
  eventName?: string;
  status?: string;
  eventType?: string;
  amount?: any;
  agreement?: boolean;
  createdDate?: Date;
  auditorium?: boolean;
  multipurpose?: boolean;
  dininghall?: boolean;
  classroom?: boolean;
  priest?: boolean;
  catering?: boolean;
  paid?: any;
  payments?: Array<Payment> = [];
  times?: RefModel[];
  states?: RefModel[];
  facilitiesDetails?: Array<FacilitiesEventDetails> = [];
  serviceTypes?: Array<RefModel> = [];
  emailButton?: Boolean;
  cancelButton?: Boolean;
  modalMessage?: string;
  modalTitle?: string;
  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService,private dialog: MatDialog) {
    console.log('FacilitiesEditComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.getTimes();
    this.getStates();
    this.getServiceTypes();
  }

  ngOnInit(): void {
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
    this.role = sessionStorage.getItem('role')!;
    if (this.requestId! > 0) {
      console.log(' ngOnInit: inside '+this.role+" - "+this.requestId!);
      this.commonSrv.getRequest(this.requestId!).subscribe((resp: EventRequest) => {
        this.request = resp;
        this.cancelButton=true;
        this.emailButton=true;
//        console.log(' ngOnInit: inside '+resp.firstName);
//        this.firstName = resp.firstName;
//        this.lastName = resp.lastName;
//        this.eventDate = resp.eventDate;
//        this.phone = resp.phone;
//        this.emailAddress = resp.emailAddress;
//        this.address = resp.address;
//        this.city = resp.city;
//        this.state = resp.state;
//        this.zipCode = resp.zipCode;
        this.startTime = resp.startTime;
        this.duration = resp.duration;
        this.numPeople = resp.numPeople;
        this.eventName = resp.eventName;
        this.status = resp.status;
        this.eventType = resp.eventType;
        this.amount = resp.amount;
        this.agreement = resp.agreement;
        this.createdDate = resp.createdDate;
        this.auditorium = resp.auditorium;
        this.multipurpose = resp.multipurpose;
        this.dininghall = resp.dininghall;
        this.classroom = resp.classroom;
        this.priest = resp.priest;
        this.catering = resp.catering;
        this.customerId = resp.customerId;
        this.facilitiesDetails = resp.facilitiesDetails;
        if (this.facilitiesDetails != null) {
          this.facilitiesDetails.forEach( r =>{
          if (r.serviceTypeId == 1) 
            this.auditorium = true;
          else if (r.serviceTypeId == 2) 
            this.multipurpose = true;
          else if (r.serviceTypeId == 3)
            this.catering = true;
          else if (r.serviceTypeId == 4) 
            this.priest = true;
          else if (r.serviceTypeId == 5) 
            this.classroom = true;
          else if (r.serviceTypeId == 7) 
            this.dininghall = true;
          });
        }
      },
        error => console.log('Error :: ' + error)
      )
    } else {
      this.request = new EventRequest();
      console.log(' ngOnInit: empty ');
    }

  }
  onModalSubmit() {
    console.log('--' + this.modalTitle);
    this.dialog.closeAll();
  }
  openDialog(templateRef: TemplateRef<any>, selectedId: number) {
    this.dialog.open(templateRef);
    this.modalMessage="";
    this.modalTitle= selectedId==1 ? "Cancel" : "Email";
    console.log('--' + selectedId);
  }
  onSave(): void {
    console.log(' onSave ');
    let srvRst: Boolean; 
    if (this.auditorium || this.multipurpose || this.dininghall || this.classroom) {
      srvRst=true;
    }
    if (this.lastName == null || this.lastName == "") {
      this.errorMsg = 'Please enter valid  last name';
    } else if (this.firstName == null || this.firstName == "") {
      this.errorMsg = 'Please enter valid first name';
    } else if (this.phone == null || this.phone == "") {
      this.errorMsg = 'Please enter valid phone';
    } else if (this.emailAddress == null || this.emailAddress.length < 2 || this.emailAddress.indexOf('@') == -1) {
      this.errorMsg = 'Please enter valid email address';
    } else if (this.eventDate == null) {
      this.errorMsg = 'Please select event date';
    } else if (this.startTime == null) {
      this.errorMsg = 'Please select event time';
    } else if (this.address == null) {
      this.errorMsg = 'Please enter street';
    } else if (this.state == null ) {
      this.errorMsg = 'Please select state';
    } else if (this.city == null || this.city == "") {
      this.errorMsg = 'Please enter city name';
    } else if (this.duration == null ) {
      this.errorMsg = 'Please enter number of hours';
    } else if (this.numPeople == null ) {
      this.errorMsg = 'Please enter number of people';
    } else if (!srvRst) {
      console.log("this.auditorium: " + this.auditorium);
      this.errorMsg = 'Please select Facilities Requested';
    } else {
//      this.request!.firstName=this.firstName;
//      this.request!.lastName=this.lastName;
//      this.request!.eventDate=this.eventDate;
//      this.request!.phone=this.phone;
//      this.request!.emailAddress=this.emailAddress;
//      this.request!.address=this.address;
//      this.request!.city=this.city;
//      this.request!.state=this.state;
//      this.request!.zipCode=this.zipCode;
      this.request!.startTime=this.startTime;
      this.request!.duration=this.duration;
      this.request!.numPeople=this.numPeople;
      this.request!.eventName=this.eventName;
      this.request!.status=this.status;
      this.request!.eventType=this.eventType;
      this.request!.amount=this.amount;
      this.request.requestId = this.requestId;
      this.request.customerId = this.request.customerId;
      let eventDetails: FacilitiesEventDetails[] = [];
      if (this.auditorium) {
        let eventDetail = new FacilitiesEventDetails();
        eventDetail.serviceTypeId = 1;
        eventDetails.push(eventDetail);
      }
      if (this.multipurpose) {
        let eventDetail = new FacilitiesEventDetails();
        eventDetail.serviceTypeId = 2;
        eventDetails.push(eventDetail);
      }
      if (this.catering) {
        let eventDetail = new FacilitiesEventDetails();
        eventDetail.serviceTypeId = 3;
        eventDetails.push(eventDetail);
      }
      if (this.priest) {
        let eventDetail = new FacilitiesEventDetails();
        eventDetail.serviceTypeId = 4;
        eventDetails.push(eventDetail);
      }
      if (this.classroom) {
        let eventDetail = new FacilitiesEventDetails();
        eventDetail.serviceTypeId = 5;
        eventDetails.push(eventDetail);
      }
      if (this.dininghall) {
        let eventDetail = new FacilitiesEventDetails();
        eventDetail.serviceTypeId = 7;
        eventDetails.push(eventDetail);
      }
      this.request!.facilitiesDetails = eventDetails;
      this.commonSrv.saveRequest(this.request!)
      .subscribe((resp: EventRequest) => {
        this.router.navigateByUrl('/facilities/home');
      },
        error => {
          this.errorMsg = 'Invalid onSave';
          console.log('Error :: ' + this.errorMsg);
        }
      );
    }

  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  setTime(selectId: string) {
    //    this.request!.startTime = selectId;
    console.log("setTime: " + selectId);
    this.startTime = selectId;
  }
  setState(selectId: string) {
    console.log("setState: " + selectId);
    this.state = selectId;
  }
  setType(selectId: string) {
    this.eventType = selectId;
  }
  setFacilitiesRequest(evnt: any, selectId: number) {
    if (selectId==1) {
      this.auditorium=evnt;
      console.log("this.auditorium: " + this.auditorium);
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
  }
  getStates() {
    this.commonSrv.getReference(CommonConstants.REF_ST).subscribe((resp: RefModel[]) => {
      this.states = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }
  getTimes() {
    this.commonSrv.getReference(CommonConstants.REF_TIME).subscribe((resp: RefModel[]) => {
      this.times = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }
  getServiceTypes() {
    this.commonSrv.getReference(CommonConstants.FACILITY_REF_SRV_TYP).subscribe((resp: RefModel[]) => {
      this.serviceTypes = resp;
    },
      error => console.log('Error :: ' + error)
    )
  }
}