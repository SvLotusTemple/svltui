import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { CommonService } from 'src/app/services/common.service';
import { RefModel } from 'src/app/models/reference';
import { CommonConstants } from '../common/CommonConstant';

@Component({
    selector: 'app-user-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./home.component.css']

})

export class UserEditComponent implements OnInit {

    user!: User;
    errorMsg?: string;
    moduleId?: number;
    roleModules!: RefModel[];
    constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
        console.log('UserEditComponent: constructor 1');
        if (sessionStorage.getItem('role') == null) {
            this.router.navigate(['/login']);
        }
        this.moduleId = Number(sessionStorage.getItem('moduleId'));
        if (sessionStorage.getItem('roleModels') == null) {
            this.getRoles();
        }
    }

    ngOnInit() {

        const selectedId = <number><any>this.route.snapshot.paramMap.get('id');
        const userObj = JSON.parse(sessionStorage.getItem('users') || '{}');
        this.moduleId = Number(sessionStorage.getItem('moduleId'));
        this.roleModules =JSON.parse(sessionStorage.getItem('roleModels') || '{}');
  
        if (selectedId > 0) {
            if (userObj != null) {
                for (let i = 0; i < userObj.length; i++) {
                    if (userObj[i].userId == selectedId) {
                        this.user = userObj[i];
                    }
                }
            }
        } else {
            this.user = new User();
            this.user.status = "A";
            for (const r of this.roleModules) {
                if (r.subId == this.moduleId) {
                    console.log('this.moduleId: '+this.moduleId);
                    console.log('this.role: '+r.id);
 //                   this.user.roles?.push({id: r.id, moduleId: r.moduleId, name: r.name});
                    this.user.roles?.push(r);
                }
            }
        }
    }

    onSave(): void {
        if (this.user.lastName == null || this.user.lastName ==""){
            this.errorMsg = 'Please enter valid  last name';
        } else if (this.user.firstName == null || this.user.firstName ==""){
            this.errorMsg = 'Please enter valid first name';
        } else if (this.user.phone == null || this.user.phone ==""){
            this.errorMsg = 'Please enter valid phone';
        } else if (this.user.emailAddress == null || this.user.emailAddress.length < 2 || this.user.emailAddress.indexOf('@') == -1){
            this.errorMsg = 'Please enter valid email address';
        } else {
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
        this.user.status = str;
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
