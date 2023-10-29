import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtils } from '../common/CommonUtils';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { CommonService } from 'src/app/services/common.service';
import { FacilitiesEventDetails, FacilitiesRequest} from 'src/app/models/facilities';
import { Payment } from 'src/app/models/payment';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../common/CommonConstant';

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
  request?: FacilitiesRequest;

  firstName?: string;
  lastName?: string;
  eventDate?: Date;
  phone?: string;
  email?: string;
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
  eventDetails?: Array<FacilitiesEventDetails> = [];
  serviceTypes?: Array<RefModel> = [];

  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService, private facilitiesSrv: FacilitiesService) {
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
      console.log(' ngOnInit: inside '+this.role);
      this.facilitiesSrv.getFacilitiesRequest(this.requestId!).subscribe((resp: FacilitiesRequest) => {
        this.request = resp;
        console.log(' ngOnInit: inside '+resp.firstName);
        this.firstName = resp.firstName;
        this.lastName = resp.lastName;
        this.eventDate = resp.eventDate;
        this.phone = resp.phone;
        this.email = resp.email;
        this.address = resp.address;
        this.city = resp.city;
        this.state = resp.state;
        this.zipCode = resp.zipCode;
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
        this.eventDetails = resp.eventDetails;
        if (this.eventDetails != null) {
          this.eventDetails.forEach( r =>{
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
      this.request = new FacilitiesRequest();
      console.log(' ngOnInit: empty ');
    }

  }

  onSave(): void {
    console.log(' onSave ');
    if (this.lastName == null || this.lastName == "") {
      this.errorMsg = 'Please enter valid  last name';
    } else if (this.firstName == null || this.firstName == "") {
      this.errorMsg = 'Please enter valid first name';
    } else if (this.phone == null || this.phone == "") {
      this.errorMsg = 'Please enter valid phone';
    } else if (this.email == null || this.email.length < 2 || this.email.indexOf('@') == -1) {
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
    } else if (this.auditorium || this.multipurpose || this.dininghall || this.classroom) {
      this.errorMsg = 'Please select Facilities Requested';
    } else {
      this.request!.firstName=this.firstName;
      this.request!.lastName=this.lastName;
      this.request!.eventDate=this.eventDate;
      this.request!.phone=this.phone;
      this.request!.email=this.email;
      this.request!.address=this.address;
      this.request!.city=this.city;
      this.request!.state=this.state;
      this.request!.zipCode=this.zipCode;
      this.request!.startTime=this.startTime;
      this.request!.duration=this.duration;
      this.request!.numPeople=this.numPeople;
      this.request!.eventName=this.eventName;
      this.request!.status=this.status;
      this.request!.eventType=this.eventType;
      this.request!.amount=this.amount;
      let eventDetails: FacilitiesEventDetails[] = [];
      if (this.auditorium) {
        let eventDetail = new FacilitiesEventDetails();
      }
      this.request!.auditorium=this.auditorium;
      this.request!.multipurpose=this.multipurpose;
      this.request!.dininghall=this.dininghall;
      this.request!.classroom=this.classroom;
      this.request!.priest=this.priest;
      this.request!.catering=this.catering;
  
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