import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {File} from "../common/file";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploadProgress: number | undefined;
  // @ts-ignore
  uploadSub: Subscription;
  fileName = '';
  file: File = new File()
  @Input() user: string;
  @Output() fileEvent = new EventEmitter<File>();

  constructor( private http: HttpClient,public datepipe: DatePipe,) {
    this.user = "";
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];


    if (file) {
      // @ts-ignore
      this.fileName = file.name;
      const formData = new FormData();
      // @ts-ignore
      formData.append("file", file);
      formData.append("filename", this.fileName);
      formData.append("uploadedBy", this.user);
      this.file.filename = this.fileName;;
      this.file.uploadedBy = this.user;
      this.file.uploadStatus = 'Uploading';
      this.file.id = this.fileName;
      // @ts-ignore
      this.file.uploadDate = (new Date);
      this.fileEvent.emit(this.file)
      const upload$ = this.http.put("https://4yezb3pos0.execute-api.us-gov-west-1.amazonaws.com/file", formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        finalize(() => this.reset())
      );


      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          // @ts-ignore
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }

        // @ts-ignore
        if(event.status && event.type === 4)
        {
          Swal.fire(
            'Success',
            // @ts-ignore
            event.body.messages[0],
            'success'
          )
          this.file.uploadStatus = 'Processing'
          this.fileEvent.emit(this.file)
        }


      }, error => {
        this.cancelUpload()
        this.reset();
        if(error.error.hasOwnProperty('message')){
          Swal.fire(
            'Error Uploading File!',
            // @ts-ignore
            error.error.message,
            'error'
          )
          this.file.uploadStatus = 'Failed'
          this.fileEvent.emit(this.file)
        }else{

          Swal.fire(
            'Error Uploading File!',
            // @ts-ignore
            error.error.messages[0],
            'error'
          )
          this.file.uploadStatus = 'Failed'
          this.fileEvent.emit(this.file)
        }


      })

    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    // @ts-ignore
    this.uploadProgress = null;
    this.uploadSub = null;
    this.fileName = '';
  }

}
