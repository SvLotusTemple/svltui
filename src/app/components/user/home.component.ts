import { Component, ViewChild , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { User } from '../../models/user';
import { RefModel } from 'src/app/models/reference';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class UserHomeComponent implements OnInit {
  users?: User[];
  error?: string;
  roleModel?: RefModel[];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  dataSource: any;
  displayedColumns: string[] = ["name", "emailAddress", "phone", "status", "roles"];
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
  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getUsers(): void {
    console.log('UserHomeComponent: getUsers');
    this.commonSrv.getUsers()
      .subscribe((resp: User[]) => {
          this.users = resp;
          if (resp != null) {
            this.dataSource = new MatTableDataSource<User>(this.users);
            this.dataSource.paginator = this.paginatior;
            this.dataSource.sort = this.sort;
          }
        },
        error => console.log('Error :: ' + error)
      )
  };
}