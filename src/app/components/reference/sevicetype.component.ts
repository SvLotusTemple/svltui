import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { CommonUtils } from "../util/CommonUtils";
import { MatTableDataSource } from "@angular/material/table";
import { RefModel } from "src/app/models/reference";
import { CommonService } from "src/app/services/common.service";
import { CommonConstants } from "../util/CommonConstant";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-reference-servicetype',
    templateUrl: './servicetype.component.html',
    styleUrls: ['./reference.component.css']
  })

  export class ReferenceServiceTypeComponent implements OnInit {
    id?: number;
    amount?: any;
    name?: string;
    modalTitle: string;
    referenceData?: RefModel[];
    @ViewChild(MatPaginator) paginatior !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;
    dataSource: any;
    displayedColumns: string[] = ["name", "amount", "status"];
 
    constructor(private router: Router, private commonSrv: CommonService,private dialog: MatDialog) {
        console.log('ReferenceServiceTypeComponent: constructor');
        if (sessionStorage.getItem('role') == null) {
          this.router.navigate(['/login']);
        }
      }
      ngOnInit(): void {
        this.commonSrv.getReference(CommonConstants.FACILITY_REF_SRV_TYP).subscribe((resp: RefModel[]) => {
          this.referenceData = resp;
          this.dataSource = new MatTableDataSource<RefModel>(this.referenceData);
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
      clear(): void {
        this.name="";
        this.amount=0;
        this.id=0;
      }
      onModalSubmit(modal: any) {
        console.log('--' + this.modalTitle);
        modal.hide();
      }
      onModal(name: string, amount: any) {
        this.name=name;
        this.amount=amount;
      }  
      openDialog(templateRef: TemplateRef<any>) {
        this.dialog.open(templateRef);
      }   
      onSave(){
        this.dialog.closeAll();
      }
  }