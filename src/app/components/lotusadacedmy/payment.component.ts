import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CommonUtils } from '../util/CommonUtils';
import { Payment } from 'src/app/models/common';
import { GeneralRequest } from 'src/app/models/request';

@Component({
  selector: 'app-lotusacademy-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./lotusacademy.component.css']
})
export class LotusAcademyPaymentComponent implements OnInit {

  errorMsg?: string;
  moduleId?: number;
  id?: number;
  amount?: any;
  firstName?: string;
  lastName?: string;
  paymentMode?: string; // check chk or cash cash or cc 
  phone?:	string;
  emailAddress?: string;	
  cardName?: string;	
  cardNumber?: string;	
  expiration?: string;
  message?: string;
  successMsg: string;
  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
    console.log('LotusAcademyPaymentComponent: constructor');
  }

  ngOnInit(): void {
    const selectedId = this.route.snapshot.paramMap.get('key');
    if (selectedId !== '0') {
      this.commonSrv.getPaymentlink(selectedId).subscribe((resp: GeneralRequest) => {
        this.id = resp.id; 
        this.moduleId = resp.moduleId; 
        this.emailAddress = resp.emailAddress; 
        this.firstName = resp.firstName; 
        this.lastName = resp.lastName; 
        this.phone = resp.phone; 
        this.amount = resp.amount;
        this.message = resp.comments; 
      },
        error => console.log('Error :: ' + error)
      );
    }

  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  onSave() {
    this.errorMsg = null;
    this.successMsg = null;
    if (this.cardNumber == null || this.cardNumber.length < 14) {
      this.errorMsg = 'Invalid credit card number';
      return;
    }
    //     this.creditCard = null;
    if (this.cardName == null || this.cardName.length < 4) {
      this.errorMsg = 'Invalid name';
      return;
    }
    if (this.expiration == null || this.expiration.length < 4) {
      this.errorMsg = 'Invalid expiry date';
      return;
    }
    let payment = new Payment();
    payment.number = this.cardNumber;
    payment.nameOnCard = this.cardName;
    payment.expiryDate = this.expiration;
    payment.amount = this.amount;
    payment.sourceId = this.id;
    payment.moduleId = this.moduleId;

    this.commonSrv.saveCreditcard(payment)
      .subscribe((resp: boolean) => {
        this.successMsg = 'Saved payment ';
      },
        error => {
          if (error != null && error.error != null && error.error.message != null) {
            this.errorMsg = error.error.message;
          } else {
            this.errorMsg = 'Not able to process payment ';
          }
        }
      );  
  }

}