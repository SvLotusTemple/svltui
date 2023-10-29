import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private router: Router) { }
    role!: string | null;
    user!: boolean | null;
    setup!: boolean | null;
    report!: boolean | null;
    home!: boolean | null;
    fileUpload!: boolean | null;
    moduleId!: number;
    path!: string;
    ngOnInit(): void {
        this.moduleId = Number(sessionStorage.getItem('moduleId')!) ;
        this.role = sessionStorage.getItem('role')! ;
        console.log('NavbarComponent: module: '+this.moduleId+ " role: "+this.role);
        if (sessionStorage.getItem('role') == null || this.moduleId == null) {
            this.router.navigate(['/login']);
        }
        if (this.moduleId == 4) {
           this.home = true;
           if (this.role == 'ADMIN') this.setup = true;
           if (this.role == 'ADMIN') this.report = true;
           this.fileUpload = true;
           if (this.role == 'ADMIN') this.user = true;
        } else if (this.moduleId == 5) {
            this.home = true;
            if (this.role == 'ADMIN') this.report = true;
            this.fileUpload = true;
            if (this.role == 'ADMIN') this.user = true;
        } else if (this.moduleId == 6) {
            if (this.role == 'ADMIN') this.report = true;
            this.fileUpload = true;
            if (this.role == 'ADMIN') this.user = true;
        }
        this.setPath(this.moduleId);
    }
    setDiv(id: number): void {
        if (id == 1) {
              this.router.navigate([this.path+"/home"]);
        } else if (id == 9){
            this.router.navigate([this.path+"/setup"]);
        } else {
            this.router.navigate([this.path]);
        }
    }
    setPath(id: number): void {
//  ''    1	SYSTEM
//        2	CATERING
//        3	CAFETERIA
//        4	PRIEST
//        5	FACILITY
//        6	FILE_UPLOAD
        if (id == 2) {
            this.path="/catering";
        } else if (id == 3){
            this.path="/cafeteria";
        } else if (id == 4){
            this.path="/priest";
        } else if (id == 5){
            this.path="/facilities";
        } else if (id == 6){
            this.path="/upload";
        } else {
            this.path="";
        }
    }
}