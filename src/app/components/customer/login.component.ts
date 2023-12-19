import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse, JwtResponse } from '../../models/user';
import { LoginRequest } from '../../models/user';
import { CommonService } from 'src/app/services/common.service';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../util/CommonConstant';
import { DataSharingService } from 'src/app/services/dataSharing.service';
import { MatDialog } from '@angular/material/dialog';
declare var getClaimsFromToken: any;

@Component({
  selector: 'app-customer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerLoginComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest();
  loginResponse!: LoginResponse;
  roleModules!: RefModel[];
  errorMsg!: string;
  constructor(private router: Router, 
    private commonSrv: CommonService, 
    private dataSharingService: DataSharingService, 
    private cdref: ChangeDetectorRef, 
    private dialog: MatDialog) {
      console.log ('CustomerLoginComponent');
    this.loginRequest = new LoginRequest();
    dataSharingService.isMenubar.next(false);
  }

  ngOnInit(): void {
    console.log ('CustomerLoginComponent ngOnInit');
    this.cleanup();
    this.commonSrv.getReference(CommonConstants.REF_ROLE)
    .subscribe((resp: RefModel[]) => {
        this.roleModules = resp;
        sessionStorage.setItem('roleModels', '' + JSON.stringify(resp));
    });
  }

  onLogin(): void {
    this.commonSrv.validateLogin(this.loginRequest, true)
      .subscribe((resp: JwtResponse) => {
        let moduleName: string;
        sessionStorage.setItem('jwtResponse', '' + JSON.stringify(resp));
        sessionStorage.setItem('accessToken', '' + resp.token);
        sessionStorage.setItem('username', '' + resp.lastName+", "+resp.firstName);
        sessionStorage.setItem('customerId', '' + resp.userId);
        for (const role of this.roleModules) {
          if (resp.roles.find(x => x === role.name)) {
            sessionStorage.setItem('moduleId', '' + role.subId);
            sessionStorage.setItem('role', '' + role.name!.substring(role.name!.indexOf("_")+1));
            moduleName = role.subName != null ? role.subName.toLowerCase(): "";
            console.log(moduleName +"---"+role.subName+"---")
            this.dataSharingService.isMenubar.next(true);
            this.cdref.detectChanges();
            break;
          }
        }
        this.router.navigateByUrl(moduleName+'/history');
      },
        error => {
          this.errorMsg = 'Invalid Login';
        }

      );
  }
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  cleanup() {
    sessionStorage.removeItem('users');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('jwtResponse');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('roleModels');
    sessionStorage.removeItem('moduleId');
    sessionStorage.removeItem('role');
}
}