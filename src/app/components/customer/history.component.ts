import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EventRequest } from 'src/app/models/request';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-customer-history',
    templateUrl: './history.component.html',
    styleUrls: ['./customer.component.css']

})

export class CustomerHistoryComponent implements OnInit {
    dataSource: any;
    displayedColumns: string[];
    customerId: number;
    events: EventRequest[];
    constructor(private router: Router, private route: ActivatedRoute, private commonSrv: CommonService) {
        console.log('CustomerHistoryComponent: constructor');
         if (sessionStorage.getItem('role') == null) {
            this.router.navigate(['/customer/login']);
        }
        this.displayedColumns = ["id", "eventDate", "startTime", "eventName", "templeEvent"];
    }

    ngOnInit() {
        this.customerId = JSON.parse(sessionStorage.getItem('customerId') || '');
        if (this.customerId >0) {
            this.getEvents();
        }
    }
    setVenue(str: string): string{
        return ("O" == str || "N" == str) ? "Outside" : ""
    }
    getEvents(): void {
        this.commonSrv.customerHistory()
            .subscribe((resp: EventRequest[]) => {
                this.events = resp;
                this.events.forEach( r =>{
                    console.log(r.eventDate);
                });
                if (resp != null) {
                    this.dataSource = new MatTableDataSource<EventRequest>(this.events);
                }
                
            }
        )
    };
}
