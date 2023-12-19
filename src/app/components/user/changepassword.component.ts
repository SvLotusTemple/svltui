import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UpdatePassword } from 'src/app/models/user';
import { JwtResponse } from 'src/app/models/user';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../util/CommonConstant';

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./home.component.css']

})

export class ChangepasswordComponent implements OnInit {

    jwtResponse: JwtResponse;
    updatePassword!: UpdatePassword;
    errorMsg: string = "";
    newPassword: string = "";
    emailAddress: string = "";
    confirmPassword: string = "";
    roles!: string;
    roleModules!: RefModel[];
    constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
        console.log('ChangepasswordComponent: constructor');
        this.jwtResponse = new JwtResponse();
         if (sessionStorage.getItem('role') == null) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.jwtResponse = JSON.parse(sessionStorage.getItem('jwtResponse') || '{}');
        if (this.jwtResponse != null) {
            this.emailAddress = this.jwtResponse.emailAddress!;
            console.log('ChangepasswordComponent: ngOnInit '+ this.emailAddress);
        }
        this.getRoles();
    }

    onSave(): void {
        this.errorMsg = null!;
        console.log('onSave: '+this.newPassword+" : "+this.confirmPassword);
        if (this.newPassword == "" || this.newPassword.length < 5){
            this.errorMsg = 'Please enter password 4+ chars long';
//            return;
        } else if (this.confirmPassword != this.newPassword){
            this.errorMsg = 'Password is not matched';
//            return;
        } else {
            this.updatePassword = new UpdatePassword();
            this.updatePassword.userId = this.jwtResponse.userId;
            this.updatePassword.oldPassword = this.jwtResponse.token;
            this.updatePassword.newPassword = this.newPassword;
            this.updatePassword.customer = false;
            for (const role of this.roleModules) {
                if (role.name == this.roles) {
                    sessionStorage.setItem('moduleId', '' + role.subId);
                    sessionStorage.setItem('role', '' + role.name.substring(role.name.indexOf("_")+1));
                }
            }
            this.commonSrv.changePassword(this.updatePassword)
                .subscribe((resp: boolean) => {
                    if (resp) {
                        if (this.roles != null && this.roles.indexOf(",")>0) {
                            this.router.navigateByUrl('/module');
                        } else {
                            this.router.navigateByUrl('/home');
                        }
                    }
                },
                    error => {
                        this.errorMsg = 'Old password is not matched';
                        console.log('Error :: ' + this.errorMsg);
                    }
                );
        }
    }
    getRoles(): void {
        this.commonSrv.getReference(CommonConstants.REF_ROLE)
            .subscribe((resp: RefModel[]) => {
                this.roleModules = resp;
            }
        )
    };
}
