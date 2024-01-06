import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonUtils } from '../util/CommonUtils';
import { MatDialog } from '@angular/material/dialog';
import { GeneralRequest } from 'src/app/models/request';
import { EmailRequest, Payment } from 'src/app/models/common';

@Component({
  selector: 'app-lotusacademy-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./lotusacademy.component.css']
})
export class LotusAcademyEditComponent implements OnInit {

  moduleId?: number;
  request?: GeneralRequest;
  id?: number;
  errorMsg?: string;
  createdDate?: Date;
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  amount?: number=0;
  comments?: string;
  modalMessage?: string;
  modalTitle?: string;
  emailButton?: Boolean;
  cancelButton?: Boolean;
  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService,private dialog: MatDialog) {
    console.log('LotusAcademyEditComponent: constructor');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.moduleId = Number(sessionStorage.getItem('moduleId'));
    if (sessionStorage.getItem('moduleId') == null) {
      this.router.navigate(['/login']);
    }
    this.request = new GeneralRequest();
    if (this.id! > 0) {
      this.commonSrv.getGeneralRequest(this.id!).subscribe((resp: GeneralRequest) => {
        this.request = resp;
        console.log('id :: ' + resp.id+" createdDate:"+resp.createdDate);
        this.id = resp.id; 
        this.createdDate = resp.createdDate;  
        this.emailAddress = resp.emailAddress; 
        this.firstName = resp.firstName; 
        this.lastName = resp.lastName; 
        this.phone = resp.phone; 
        this.amount = resp.amount;
        this.comments = resp.comments; 
        this.emailButton = true;
        this.cancelButton = true;
        if (resp.payments != null) {
          this.request.payments = resp.payments;
        }

      },
        error => console.log('Error :: ' + error)
      )
    } else {
      this.id=0;

      this.amount = 0;
      this.moduleId = this.moduleId;
      this.request.amount = 0;
      this.request.payments = [];
      this.request.moduleId = this.moduleId;
      this.emailButton = false;
      this.cancelButton = false;
    }

  }

  ngOnInit(): void {

  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
    this.modalMessage="";
    this.modalTitle=  "Email";
  }
  onModalSubmit() {
    console.log('--' + this.modalTitle);
    let emailRequest = new EmailRequest();
    emailRequest.moduleId = this.moduleId;
    emailRequest.emailAddress = this.emailAddress;
    emailRequest.message = this.modalMessage;
    this.commonSrv.sendEmail(emailRequest)
    .subscribe((resp: GeneralRequest) => {
      this.router.navigateByUrl('/lotusacademy/home');
    },
      error => {
        this.errorMsg = 'Invalid onSave';
        console.log('Error :: ' + this.errorMsg);
      }
    ); 
    this.dialog.closeAll();
  }
  sendPaymentLink() {
    console.log('--' + this.modalTitle);
    let payment = new Payment();
    payment.moduleId = this.moduleId;
    payment.sourceId = this.id;
    this.commonSrv.sendPaymentLink(payment)
    .subscribe((resp: GeneralRequest) => {
      this.router.navigateByUrl('/lotusacademy/home');
    },
      error => {
        this.errorMsg = 'Invalid onSave';
        console.log('Error :: ' + this.errorMsg);
      }
    ); 
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
    } else if (this.amount == null || this.amount == 0) {
      this.errorMsg = 'Please enter amount';
    } else {
      console.log('id :: ' + this.request.id);
      this.request.id = this.id; 
      this.request.createdDate = this.createdDate;  
      this.request.emailAddress = this.emailAddress; 
      this.request.firstName = this.firstName; 
      this.request.lastName = this.lastName; 
      this.request.phone = this.phone; 
      this.request.amount = this.amount;
      this.request.comments = this.comments;
      this.commonSrv.saveGeneralRequest(this.request!)
        .subscribe((resp: GeneralRequest) => {
          this.router.navigateByUrl('/lotusacademy/home');
        },
          error => {
            this.errorMsg = 'Invalid onSave';
            console.log('Error :: ' + this.errorMsg);
          }
        );      
    }
  }
}