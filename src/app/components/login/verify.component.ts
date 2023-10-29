import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse, JwtResponse } from '../../models/user';
import { CommonService } from 'src/app/services/common.service';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../common/CommonConstant';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./login.component.css']
})

export class VerifyComponent implements OnInit {
  key!: string;
  loginResponse!: LoginResponse;
  roleModules!: RefModel[];
  constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
  }

  ngOnInit(): void {

    this.key = this.route.snapshot.paramMap.get('key') || '';
    this.getRoles();
    this.onVerify();
  }

  onVerify(): void {
    this.commonSrv.validateKey(this.key)
      .subscribe((resp: JwtResponse) => {
        console.log('Verify: '+resp.firstName);
        if (resp.firstName == "ChangePassword") {
          sessionStorage.setItem('jwtResponse', '' + JSON.stringify(resp));
          sessionStorage.setItem('accessToken', '' + resp.token);
          sessionStorage.setItem('username', '' + resp.lastName+", "+resp.firstName);
          for (const role of this.roleModules) {
            if (role.name == resp.roles) {
                  sessionStorage.setItem('moduleId', '' + role.subId);
                  sessionStorage.setItem('role', '' + role.name!.substring(role.name!.indexOf("_")+1));
              }
          }
          this.router.navigateByUrl('/changepassword');
        } else {
          this.router.navigateByUrl('/login');
        }
      },
        error => {
          this.router.navigateByUrl('/login');
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
