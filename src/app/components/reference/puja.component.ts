import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PujaModel } from "src/app/models/reference";
import { CommonService } from "src/app/services/common.service";
import { CommonUtils } from "../util/CommonUtils";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-reference-puja',
    templateUrl: './puja.component.html',
    styleUrls: ['./reference.component.css']
  })

  export class ReferencePujaComponent implements OnInit {
    pujas?: PujaModel[];
    @ViewChild(MatPaginator) paginatior !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;
    dataSource: any;
    displayedColumns: string[] = ["pujaName", "amount", "outsideAmount", "pujaHours", "status"];
 
    constructor(private router: Router, private commonSrv: CommonService) {
        console.log('ReferencePujaComponent: constructor');
        if (sessionStorage.getItem('role') == null) {
          this.router.navigate(['/login']);
        }
      }
    
      ngOnInit(): void {
        this.commonSrv.getPujas().subscribe((resp: PujaModel[]) => {
            this.pujas = resp;
            this.dataSource = new MatTableDataSource<PujaModel>(this.pujas);
            this.dataSource.paginator = this.paginatior;
            this.dataSource.sort = this.sort;
          },
            error => console.log('Error :: ' + error)
          )
      }
      setStatus(str: string){
        return CommonUtils.setStatus(str);
      }
      filterChange(data: Event) {
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
      }
  }