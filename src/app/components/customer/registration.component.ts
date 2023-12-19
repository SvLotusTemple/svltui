import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/common";
import { RefModel } from "src/app/models/reference";
import { CommonService } from "src/app/services/common.service";
import { CommonConstants } from "../util/CommonConstant";

@Component({
    selector: 'app-customer-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./customer.component.css']
  })
export class RegistrationComponent implements OnInit {
    customer: Customer;
    customerId: number;
    errorMsg: string;
    firstName?: string;	
    lastName?: string;	
    phone?:	string;
    emailAddress?: string;	
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    states?: RefModel[];
    constructor(private router: Router, private route: ActivatedRoute, 
        private commonSrv: CommonService, 
        private dialog: MatDialog) {
          console.log ('CustomerLoginComponent');
        this.customer = new Customer();
        this.getStates();
      }
    ngOnInit(): void {
        this.customerId = Number(this.route.snapshot.paramMap.get('customerId'));
        if (this.customerId != null) {
          this.commonSrv.getCustomer(this.customerId)
          .subscribe((resp: Customer) => {
            if (resp != null) {
              this.customer = resp;
              this.emailAddress = resp.emailAddress; 
              this.firstName = resp.firstName; 
              this.lastName = resp.lastName; 
              this.address = resp.address; 
              this.city = resp.city; 
              this.state = resp.state; 
              this.zipCode = resp.zipCode; 
              this.phone = resp.phone; 
            } else {
              this.customer = new Customer();
            }
          });
        } else {
          this.customer = new Customer();
        }
    }
    getStates() {
        this.commonSrv.getReference(CommonConstants.REF_ST).subscribe((resp: RefModel[]) => {
            this.states = resp;
        },
            error => console.log('Error :: ' + error)
        )
    }
    setState(selectId: string) {
        console.log("-setState-" + selectId);
        this.state = selectId;
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
        } else if (this.state == null ) {
          this.errorMsg = 'Please select state';
        } else if (this.address == null ) {
          this.errorMsg = 'Please enter street';
        } else if (this.city == null || this.city == "") {
          this.errorMsg = 'Please enter city name';
        } else {
          console.log('priestId :: ' + this.customerId);
          this.customer.emailAddress = this.emailAddress; 
          this.customer!.firstName = this.firstName; 
          this.customer!.lastName = this.lastName; 
          this.customer!.address = this.address; 
          this.customer!.city = this.city; 
          this.customer!.state = this.state; 
          this.customer!.zipCode = this.zipCode; 
          this.customer!.phone = this.phone; 
          this.commonSrv.saveCustomer(this.customer!)
            .subscribe((resp: Customer) => {
              this.router.navigateByUrl('/customer/registrationSuccess');
            },
              error => {
                this.errorMsg = 'Invalid onSave';
                console.log('Error :: ' + this.errorMsg);
              }
            );      
        }
      }
}