import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Order} from "../common/order";
import {map} from "rxjs/operators";
import {File} from "../common/file";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //private url = '/orders-api/order';
  private url = 'https://ivw7x30thj.execute-api.us-gov-west-1.amazonaws.com/order';
  items = [];
  private wait: number = 0;
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getOrder(id: string): Observable<Order> {
    return this.http.get<GetResponse>(this.url + "/" + id).pipe(
      map(response => response.orders[0])
    );
  }

  getOrdersByFile(file_id: string): Observable<Order[]> {
    return this.http.get<GetResponse>(this.url + "?fileId=" + file_id).pipe(
      map(response => response.orders)
    );
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<GetResponse>(this.url).pipe(
      map(response => response.orders)
    );

  }

  addOrders( file: File): Observable<any> {
    let formData: any = new FormData();
    formData.append("filename", "A Test");
    formData.append("file", file);
    formData.append("uploadedBy", "Kitt Parker")

    return this.http.put<File>(this.url, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  upload(files: File[]) {

    // let formData: FormData = new FormData();
    // for (let file of files) {
    //     formData.append('files', file, file.name);
    // }

    // let headers = new HttpHeaders();
    // headers.append('Accept', 'application/json');

    // return this.http.post("", formData, { headers: headers }).pipe(
    //   tap(() => this.messageService.add("Uploaded file(s).")),
    //   //catchError(() => this.messageService.add("Error"))
    // );
    this.messageService.add("Uploaded " + files.length + " file(s).");
  }

}

interface GetResponse {
  orders: Order[];
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
