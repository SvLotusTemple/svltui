import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./login.component.css']
})

export class LogoutComponent implements OnInit {

    errorMsg?: string;
    user: User = new User();
    constructor(private router: Router) {
        console.log('LogoutComponent: constructor');
    }

    ngOnInit(): void {
        console.log('LogoutComponent: ngOnInit');
        this.cleanup();
        this.router.navigateByUrl('/login');
    }
    onLogin(): void {
    }
    cleanup() {
        sessionStorage.removeItem('users');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('jwtResponse');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('roleModels');
        sessionStorage.removeItem('moduleId');
        sessionStorage.removeItem('role');
    }
}