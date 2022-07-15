import { Component, OnInit } from '@angular/core';
import { File } from '../common/file';
import { UploadStatus } from '../enums/uploadStatus';
import {FileService} from "../services/file.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { DatePipe } from '@angular/common';
import {OAuthService} from "angular-oauth2-oidc";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  form: FormGroup;
  public files: File[] | undefined;
  page: any;
  uploadProgress: number | undefined;
  // @ts-ignore
  uploadSub: Subscription;
  fileName = '';
  message = '';
  loading = true;

  public get UploadStatus() {
    return UploadStatus;
  }

  constructor(public fb: FormBuilder,
              private fileService: FileService,
              private router: Router,
              private route: ActivatedRoute,
              public datepipe: DatePipe,
              private oauthService: OAuthService) {
    this.form = this.fb.group({
      file: [null]
    })

  }


  getUserName(){
    const claims = this.oauthService.getIdentityClaims();
    if(!claims){
      return null;
    }
    return claims['name'];
  }

  ngOnInit(): void {

    this.getFiles();
  }


  getFiles(): void {
    this.loading = true;
    this.files = [];
    this.fileService.getFiles().subscribe( files => {
      this.files = files.
      sort((a, b) => (a.uploadDate < b.uploadDate) ? 1 : -1);
      this.loading = false;
    })
  }

  deleteFile(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will have to re-upload file to restore records",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileService.deleteFile(id).subscribe(message => {
          this.message = message;
          if(this.message != "Error deleting orders"){
            this.getFiles()
            Swal.fire(
              'Deleted!',
              'File has been deleted.',
              'success'
            )
          }else{
            Swal.fire(
              'Error!',
              this.message,
              'danger'
            )
          }
        })


      }
    })


  }


  fixDate(date: string){
    return this.datepipe.transform(date, 'MM/dd/yyyy @ h:mm a')
  }

  addFile(file: File){
    if(file.uploadStatus == 'Uploading'){
      // @ts-ignore
      this.files = this.files.filter(x => {
        return x.id != file.id;
      })
      this.files?.push(file)

    }else if(file.uploadStatus == 'Failed') {
      // @ts-ignore
      this.files = this.files.filter(x => {
        return x.id != file.id;
      })
    }else if (file.uploadStatus == 'Success' || file.uploadStatus == 'Processing' ){
      // @ts-ignore
      this.files = this.files.filter(x => {
        return x.id != file.id;
      })
      this.files?.push(file);
    }

    this.files?.sort((a, b) => (a.uploadDate < b.uploadDate) ? 1 : -1);
  }

}
