import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
        console.log('TokenInterceptor: constructor ');
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('TokenInterceptor: intercept ');
        if (!request.headers.has('Accept')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Expires', '0') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Toke') });
        request = request.clone({ headers: request.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate') });
        request = request.clone({ headers: request.headers.set('X-Content-Type-Options', 'nosniff') });
        request = request.clone({ headers: request.headers.set('X-XSS-Protection', '1; mode=block') });
        if (sessionStorage.getItem('accessToken')) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken')) });
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                if (error.error instanceof HttpErrorResponse) {
                   console.error('Backend returned status code: ', error.status);
                   console.error('Response body:', error.error);
                   errorMsg = 'Error: ${error.error.message}';
                } else {
                   errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                }
                console.log(errorMsg);
                return throwError(errorMsg);
             }));
    }
}
