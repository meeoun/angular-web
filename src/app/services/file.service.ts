import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { File } from '../common/file';
import { MessageService } from './message.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //private url = '/files-api/file';
  private url = 'https://4yezb3pos0.execute-api.us-gov-west-1.amazonaws.com/file'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getFiles(): Observable<File[]> {
    return this.http.get<GetResponse>(this.url).pipe(
      map(response => response.files)
    );
  }


  getFile(id: string): Observable<File> {
    return this.http.get<GetResponse>(this.url + "/" + id).pipe(
      map(response => response.files[0])
    );
  }

  deleteFile(id: string): Observable<string> {
    return this.http.delete<GetMessage>(this.url + "/" + id).pipe(map(response => response.messages[0]));
  }



}

interface GetResponse {
  files: File[];
}

interface GetMessage {
  messages: string[];
}

