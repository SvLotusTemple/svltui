import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse, JwtResponse } from '../../models/user';
import { CommonService } from 'src/app/services/common.service';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../util/CommonConstant';

@Component({
  selector: 'app-customer-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerVerifyComponent implements OnInit {
  key!: string;
  loginResponse!: LoginResponse;
  roleModules!: RefModel[];
  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
    console.log('Verify: constructor');
  }

  ngOnInit(): void {
    console.log('Verify: ngOnInit');
    this.key = this.route.snapshot.paramMap.get('key') || '';
    this.getRoles();
    this.commonSrv.validateKey(this.key, "login/customer")
      .subscribe((resp: JwtResponse) => {
        if (resp != null) {
          console.log('Verify: '+resp.firstName);
          sessionStorage.setItem('jwtResponse', '' + JSON.stringify(resp));
          sessionStorage.setItem('accessToken', '' + resp.token);
          sessionStorage.setItem('username', '' + resp.lastName+", "+resp.firstName);
          if ( resp.roles != null) {
            for (const role of this.roleModules) {
                  sessionStorage.setItem('moduleId', '' + role.subId);
                  sessionStorage.setItem('role', '' + role.name!.substring(role.name!.indexOf("_")+1));
              }
          }
        }
        this.router.navigateByUrl('/customer/changepassword');
      },
        error => {
          this.router.navigateByUrl('/customer/login');
        }
    );
  }
  getRoles(): void {
    this.commonSrv.getReference(CommonConstants.REF_ROLE)
        .subscribe((resp: RefModel[]) => {
            this.roleModules = resp;
        }
    )
};
}
