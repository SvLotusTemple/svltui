import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-priest-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./home.component.css']
  })

  export class PriestSetupComponent implements OnInit {
    constructor(private router: Router) {
        console.log('PriestReferenceComponent: constructor');
        if (sessionStorage.getItem('role') == null) {
          this.router.navigate(['/login']);
        }
      }
    
      ngOnInit(): void {
      }
  }