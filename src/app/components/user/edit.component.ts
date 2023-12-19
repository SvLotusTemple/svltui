import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { CommonService } from 'src/app/services/common.service';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../util/CommonConstant';

@Component({
    selector: 'app-user-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./home.component.css']

})

export class UserEditComponent implements OnInit {

    user: User;
    errorMsg?: string;
    moduleId?: number;
    roleModules: RefModel[] = [];
    roles: RefModel[] = [];
    userId?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    emailAddress?: string;
    status?: string; 
    constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
        console.log('UserEditComponent: constructor 1');
    }

    ngOnInit() {
        if (sessionStorage.getItem('role') == null) {
            this.router.navigate(['/login']);
        }
        this.moduleId = Number(sessionStorage.getItem('moduleId'));
        this.userId = <number><any>this.route.snapshot.paramMap.get('id');
        this.roleModules =JSON.parse(sessionStorage.getItem('roleModels') || '{}');
        if (sessionStorage.getItem('roleModels') == null) {
            this.getRoles();
        }
        for (const r of this.roleModules) {
            console.log('ngOnInit::roleModules '+r);
            if (r.subId == this.moduleId && r.name.indexOf("USER") >0) {
                this.roles?.push(r);
            }
        }

        if (this.userId > 0) {
            this.commonSrv.getUser(this.userId!).subscribe((resp: User) => {
            this.firstName = resp.firstName;
            this.lastName = resp.lastName;
            this.phone = resp.phone;
            this.emailAddress = resp.emailAddress;
            this.status = resp.status;
            console.log('ngOnInit: '+this.firstName);
            },
            error => console.log('Error :: ' + error)
          )
        } else {
            this.status ="A";
        }
       
    }

    onSave(): void {
        console.log(this.user);
        if (this.lastName == null || this.lastName ==""){
            this.errorMsg = 'Please enter valid  last name';
        } else if (this.firstName == null || this.firstName ==""){
            this.errorMsg = 'Please enter valid first name';
        } else if (this.phone == null || this.phone ==""){
            this.errorMsg = 'Please enter valid phone';
        } else if (this.emailAddress == null || this.emailAddress.length < 2 || this.emailAddress.indexOf('@') == -1){
            this.errorMsg = 'Please enter valid email address';
        } else {
            this.user = new User();
            this.user.firstName = this.firstName;
            this.user.lastName = this.lastName;
            this.user.phone = this.phone;
            this.user.emailAddress = this.emailAddress;
            this.user.status = this.status;
            this.user.userId = this.userId;
            this.user.roles = this.roles
            this.commonSrv.saveUser(this.user)
            .subscribe((resp: User) => {
                sessionStorage.setItem('users', null!);
                this.router.navigateByUrl('/user');
            },
                error => {
                    this.errorMsg = 'Invalid onSave';
                    console.log('Error :: ' + this.errorMsg);
                }
            );
        }
      }
    onDelete(): void {

        this.commonSrv.deleteUser(Number(this.user.userId));
        this.router.navigateByUrl('/user');
    }
    setStatusButton(str: string): void {
        this.status = str;
    }
    getRoles(): void {
        this.commonSrv.getReference(CommonConstants.REF_ROLE)
            .subscribe((resp: RefModel[]) => {
                this.roleModules = resp;
                sessionStorage.setItem('roleModels', '' + JSON.stringify(resp));
            }
        )
      };

}
