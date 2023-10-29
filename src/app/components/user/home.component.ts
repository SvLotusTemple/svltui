import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { User } from '../../models/user';
import { RefModel } from 'src/app/models/reference';
import { CommonUtils } from '../common/CommonUtils';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class UserHomeComponent implements OnInit {
  users?: User[];
  error?: string;
  roleModel?: RefModel[];
  constructor(private router: Router, private commonSrv: CommonService) {
    console.log('UserHomeComponent: constructor');
        if (sessionStorage.getItem('role') == null) {
            this.router.navigate(['/login']);
        }
  }

  ngOnInit(): void {
    let dNow = new Date();
    let expiry = sessionStorage.getItem('expiry');
    if (Number(expiry) <= (Number(dNow.getMilliseconds) + 3600)) {
      this.router.navigateByUrl('/home');
    }
    this.getUsers();
  }
  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  convertStatus(status: string): string {
    return status == 'A' ? 'Active' : 'Inactive';
  }
  convertRole(roles: RefModel[]): string {
    let s = "";
    for (const role of roles) {
        s = s+role.name!+" ";
    }
    return roles == null ? "" : s!;
  }
  getUsers(): void {
    console.log('UserHomeComponent: getUsers');
    this.commonSrv.getUsers()
      .subscribe((resp: User[]) => {
          this.users = resp;
          sessionStorage.setItem('users', JSON.stringify(resp));
        },
        error => console.log('Error :: ' + error)
      )
  };
}