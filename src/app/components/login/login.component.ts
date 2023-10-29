import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse, JwtResponse } from '../../models/user';
import { LoginRequest } from '../../models/user';
import { CommonService } from 'src/app/services/common.service';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../common/CommonConstant';
declare var getClaimsFromToken: any;
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest();
  loginResponse!: LoginResponse;
  roleModules!: RefModel[];
  errorMsg!: string;
  title = 'SV Lotus Temple';
  constructor(private router: Router, private commonSrv: CommonService) {
    this.loginRequest = new LoginRequest();
  }

  ngOnInit(): void {
    this.cleanup();
    this.commonSrv.getReference(CommonConstants.REF_ROLE)
    .subscribe((resp: RefModel[]) => {
        this.roleModules = resp;
        sessionStorage.setItem('roleModels', '' + JSON.stringify(resp));
    }
)
  }

  onLogin(): void {
    this.commonSrv.validateLogin(this.loginRequest)
      .subscribe((resp: JwtResponse) => {
        sessionStorage.setItem('jwtResponse', '' + JSON.stringify(resp));
        sessionStorage.setItem('accessToken', '' + resp.token);
        sessionStorage.setItem('username', '' + resp.lastName+", "+resp.firstName);
        for (const role of this.roleModules) {
          if (role.name == resp.roles) {
                sessionStorage.setItem('moduleId', '' + role.subId);
                sessionStorage.setItem('role', '' + role.name!.substring(role.name!.indexOf("_")+1));
            }
        }
        if (resp.firstName == "ChangePassword") {
          this.router.navigateByUrl('/changepassword');
        } else if (resp.roles!.length>1) {
          this.router.navigateByUrl('/module');
        } else {
          this.router.navigateByUrl('/home');
        }
      },
        error => {
          this.errorMsg = 'Invalid Login';
        }

      );
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
