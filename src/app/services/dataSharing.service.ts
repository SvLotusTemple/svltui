import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public isMenubar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}