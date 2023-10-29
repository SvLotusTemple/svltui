import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { FileUploadModel, UploadFileRequest } from 'src/app/models/upload';
import { CommonUtils } from '../common/CommonUtils';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  moduleId?: number;
  role?: string;
  files?: FileUploadModel[];
  errorMsg?: string;
  fileRequest?: UploadFileRequest;
  message?: string;
  fileType?: string;
  file: File = null!;
  mywindow: any;

  constructor(private router: Router, private commonSrv: CommonService) {
    console.log('UploadComponent: constructor');
    if (sessionStorage.getItem('role') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.moduleId = Number(sessionStorage.getItem('moduleId')!);
    this.role = sessionStorage.getItem('role')!;
    this.getFiles();
  }
  

  convertDate(number: Date) {
    return CommonUtils.convertDate(number);
  }
  setArchive(id: number): void {
    this.commonSrv.saveFileAchive(id).subscribe();
    this.getFiles();
  }
  setStatus(status: string): string {
    if ("P" == status) return "Processed";
    return "";
  }
  delete(hashCd: string): void {
    this.commonSrv.deleteFile(hashCd).subscribe();
    this.getFiles();
  }
  addFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    this.fileRequest = new UploadFileRequest();

    reader.onload = () => {
      var stringArray = (reader.result + "").split(",");
      this.fileRequest!.fileName = event.target.files[0].name;
      this.fileRequest!.blob = stringArray[1];
      this.fileRequest!.fileType = stringArray[0].split(":")[1].substring(0, stringArray[0].split(":")[1].indexOf(";"));
      this.fileRequest!.moduleId = 1;
    };

  }

  onSave(modal: any): void {
    this.fileRequest!.message = this.message;
    this.fileRequest!.moduleId = this.moduleId;
    this.commonSrv.saveFile(this.fileRequest!).subscribe((resp: Boolean) =>{
      this.getFiles();
    }
    );
    modal.hide();
   
  }
  getFiles(): void {
    console.log('UploadComponent: getUsers');
    this.commonSrv.getFiles()
      .subscribe((resp: FileUploadModel[]) => {
        this.files = resp;
      },
        error => console.log('Error :: ' + error)
      )
  };
  clear(): void {
    this.errorMsg="";
    this.message="";
    event = null!;
  }
}