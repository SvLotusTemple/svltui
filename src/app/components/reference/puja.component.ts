import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PujaModel } from "src/app/models/reference";
import { CommonService } from "src/app/services/common.service";
import { CommonUtils } from "../common/CommonUtils";

@Component({
    selector: 'app-reference-puja',
    templateUrl: './puja.component.html',
    styleUrls: ['./reference.component.css']
  })

  export class ReferencePujaComponent implements OnInit {
    pujas?: PujaModel[];
    constructor(private router: Router, private commonSrv: CommonService) {
        console.log('ReferencePujaComponent: constructor');
        if (sessionStorage.getItem('role') == null) {
          this.router.navigate(['/login']);
        }
      }
    
      ngOnInit(): void {
        this.commonSrv.getPujas().subscribe((resp: PujaModel[]) => {
            this.pujas = resp;
          },
            error => console.log('Error :: ' + error)
          )
      }
      setStatus(str: string){
        return CommonUtils.setStatus(str);
      }
  }