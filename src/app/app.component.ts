import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sri Venkateswara Lotus Temple';
  username!: string;
  constructor() {
  }
  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
  }
}
