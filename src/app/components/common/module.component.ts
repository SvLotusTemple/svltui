import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefModel } from 'src/app/models/reference';
import { JwtResponse } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';
import { CommonConstants } from '../util/CommonConstant';
@Component({
    selector: 'app-module',
    templateUrl: './module.component.html',
    styles: [`
        .blue  a {
            background-color: blue !important;
        }
    `]
})
export class ModuleComponent implements OnInit {

    modules!: string[];
    roleModels!: RefModel[];
    moduleModels!: RefModel[];
    jwtResponse!: JwtResponse;

    constructor(private router: Router, private commonSrv: CommonService) { }
    
    ngOnInit(): void {
        this.jwtResponse = JSON.parse(sessionStorage.getItem('jwtResponse') || '{}');
        this.modules = this.jwtResponse.roles || [];
        this.getRoles();
    }
    onSelect(module: string): void {
        for (const role of this.roleModels) {
            if (role.name == module) {
                sessionStorage.setItem('moduleId', '' + role.subId);
                sessionStorage.setItem('role', '' + role.name.substring(role.name.indexOf("_")+1));
                this.router.navigateByUrl('/home');
            }
        }
    }
    getRoles(): void {
        this.commonSrv.getReference(CommonConstants.REF_ROLE)
            .subscribe((resp: RefModel[]) => {
                this.roleModels = resp;
            }
        )
    };

}