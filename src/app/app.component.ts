import { ChangeDetectorRef, Component } from '@angular/core';
import { DataSharingService } from './services/dataSharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sri Venkateswara Lotus Temple';
  username!: string;
  isMenubar: boolean;
  currentURL: string; 
  constructor(private dataSharingService: DataSharingService, private cdref: ChangeDetectorRef) {
    this.isMenubar = false;
    this.currentURL = window.location.href; 
  }
  ngOnInit() {
        // Subscribe here, this will automatically update 
    // "isUserLoggedIn" whenever a change to the subject is made.
    this.dataSharingService.isMenubar.subscribe(value => {
      this.isMenubar = value;
      console.log("AppComponent ChangeDetectorRef "+this.isMenubar+" : "+this.currentURL);
      this.cdref.detectChanges();
      this.username = sessionStorage.getItem('username');
    });

  }
}
