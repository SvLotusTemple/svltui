import { ChangeDetectorRef, Component, Input, OnInit, booleanAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/dataSharing.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isMenubar: boolean;
    role!: string | null;
    user!: boolean | null;
    setup!: boolean | null;
    report!: boolean | null;
    home!: boolean | null;
    fileUpload!: boolean | null;
    moduleId!: number;
    path!: string;
    constructor(private router: Router,private dataSharingService: DataSharingService, private cdref: ChangeDetectorRef, private route: ActivatedRoute) { }
    ngOnInit(): void {
        console.log("NavbarComponent ngOnInit "+this.isMenubar+ " route: "+this.route);
        this.moduleId = Number(sessionStorage.getItem('moduleId')!) ;
        this.role = sessionStorage.getItem('role')! ;
        if (sessionStorage.getItem('role') == null || this.moduleId == null) {
            this.router.navigate(['/login']);
        }
        // no change detection instead of refresh page
        this.dataSharingService.isMenubar.subscribe(value => {
            console.log("NavbarComponent ChangeDetectorRef "+this.isMenubar);
            this.isMenubar = value;
            this.moduleId = Number(sessionStorage.getItem('moduleId')!) ;
            this.role = sessionStorage.getItem('role')! ;    
          });   
        if ((this.moduleId != null && this.moduleId>0)) {
            this.isMenubar = true;
            if (this.moduleId == 4) {
                this.home = true;
                this.fileUpload = true;
                if (this.role == 'ADMIN') this.setup = true;
                if (this.role == 'ADMIN') this.report = true;
                if (this.role == 'ADMIN') this.user = true;
            } else if (this.moduleId == 5) {
                this.home = true;
                this.fileUpload = true;
                if (this.role == 'ADMIN') this.setup = true;
                if (this.role == 'ADMIN') this.report = true;
                if (this.role == 'ADMIN') this.user = true;
            } else if (this.moduleId == 6) {
                this.home = true;
                this.fileUpload = true;
                if (this.role == 'ADMIN') this.report = true;
                if (this.role == 'ADMIN') this.user = true;
            }
            this.setPath(this.moduleId);            
        }
        console.log('NavbarComponent: module: '+this.moduleId+ " role: "+this.role+" menubar: "+this.isMenubar );
    }
    setDiv(id: number): void {
        if (id == 1) {
              this.router.navigate([this.path+"/home"]);
        } else if (id == 9){
            this.router.navigate(["/setup"]);
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