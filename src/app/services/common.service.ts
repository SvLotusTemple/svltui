import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/user';
import { JwtResponse } from '../models/user';
import { UpdatePassword } from '../models/user';
import { PujaModel, RefModel} from '../models/reference';
import { User } from '../models/user';
import { UploadFileRequest } from '../models/upload';

@Injectable()
export class CommonService {
    url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url + 'user/findUsers');
    }

    getUser(selectedId: number): Observable<User> {
        return this.http.get<User>(this.url + 'user/findId/' + selectedId);
    }

    validateLogin(user: LoginRequest): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.url + 'login/validate', user);
    }
    validateKey(key: string): Observable<JwtResponse> {
        return this.http.get<JwtResponse>(this.url + 'login/verify/'+key);
    }
    changePassword(updatePassword: UpdatePassword): Observable<Boolean> {
        return this.http.post<Boolean>(this.url + 'login/changePassword', updatePassword);
    }
    saveUser(user: User): Observable<User> {
        return this.http.post<User>(this.url + 'user/update', user);
    }
    deleteUser(selectedId: number) {
        this.http.get(this.url + 'user/delete/' + selectedId);
    }
// file upload
    saveFileAchive(fileId: number) {
        return this.http.get(this.url + 'upload/archive/' + fileId);
    }
    getFiles(): Observable<User[]> {
        return this.http.get<User[]>(this.url + 'upload/list');
    }
    uploadFile(file: any): void {
        const options = {
            headers: {
              "Content-Type": "undefined"
            }} as any;
        this.http.post<any>(this.url + 'upload/file', file, options)
        .toPromise()
    .catch((e) => {
      // handle me
    });
    }
    saveFile(file: UploadFileRequest): Observable<Boolean> {
        return this.http.post<Boolean>(this.url + 'upload/file/savefile', file);
    }
    deleteFile(hashCd: string) {
        return this.http.get(this.url + 'upload/delete/' + hashCd);
    }
    // reference
    getReference(reference: string): Observable<RefModel[]> {
        return this.http.get<RefModel[]>(this.url + 'api/reference/'+reference);
    }
    getPujas(): Observable<PujaModel[]> {
        return this.http.get<PujaModel[]>(this.url + 'api/reference/puja/findAll');
    }   
    getPuja(selectedId: number): Observable<PujaModel> {
        return this.http.get<PujaModel>(this.url + 'api/reference/puja/findId/' + selectedId);
    }
    saveReferencePuja(obj: PujaModel): Observable<PujaModel> {
        return this.http.post<PujaModel>(this.url + 'reference/puja/save', obj);
    } 
}