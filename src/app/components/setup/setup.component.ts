import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
  })

  export class SetupComponent implements OnInit {
    moduleId: number;
    constructor(private router: Router) {
        console.log('SetupComponent: constructor');
        if (sessionStorage.getItem('role') == null) {
          this.router.navigate(['/login']);
        }
        this.moduleId = Number(sessionStorage.getItem('moduleId')!);
      }
      ngOnInit(): void {
      }
  }
//        1	SYSTEM
//        2	CATERING
//        3	CAFETERIA
//        4	PRIEST
//        5	FACILITY
//        6	FILE_UPLOAD