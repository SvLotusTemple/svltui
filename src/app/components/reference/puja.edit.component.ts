import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PujaModel } from "src/app/models/reference";
import { CommonService } from "src/app/services/common.service";

@Component({
    selector: 'app-priest-reference-edit',
    templateUrl: './puja.edit.component.html',
    styleUrls: ['./reference.component.css']
  })

  export class ReferenceEditComponent implements OnInit {
    id?: number;
    errorMsg?: string;
    amount?: any;
    outsideAmount?: any;
    pujaHours?: number;
    pujaName?: string;
    pujaDetails?: string;
    status?: string;
    constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
        console.log('ReferenceEditComponent: constructor');
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (sessionStorage.getItem('role') == null) {
          this.router.navigate(['/login']);
        }
      }
    
      ngOnInit(): void {
        if (this.id! > 0) {
          this.commonSrv.getPuja(this.id!).subscribe((resp: PujaModel) => {
            this.id = resp.id;
            this.amount = resp.amount;
            this.outsideAmount = resp.outsideAmount;
            this.pujaHours = resp.pujaHours;
            this.pujaName = resp.pujaName;
            this.pujaDetails = resp.pujaDetails;
            this.status = resp.status;
          },
            error => console.log('Error :: ' + error)
          )
        } else {
          this.status = 'A';
        }
      }
      onSave(){
        if (this.pujaName == null || this.pujaName == "") {
          this.errorMsg = 'Please enter puja name';
        } else if (this.amount == null || this.amount <1) {
          this.errorMsg = 'Please enter valid amount ';
        } else if (this.outsideAmount == null || this.outsideAmount <1) {
          this.errorMsg = 'Please enter valid outside amount ';
        } else if (this.pujaHours == null || this.pujaHours <1) {
          this.errorMsg = 'Please enter valid puja hours ';
        } else {
          let request = new PujaModel();
          request.id = this.id;
          request.amount = this.amount;
          request.outsideAmount = this.outsideAmount;
          request.pujaHours = this.pujaHours;
          request.pujaName = this.pujaName;
          request.pujaDetails = this.pujaDetails;
          request.status = this.status;
          this.commonSrv.saveReferencePuja(request!)
          .subscribe((resp: PujaModel) => {
            this.router.navigateByUrl('/reference/puja');
          },
            error => {
              this.errorMsg = 'Invalid onSave';
              console.log('Error :: ' + this.errorMsg);
            }
          );
        }
      }
  }