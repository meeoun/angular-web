import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileListComponent } from './file-list/file-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { FileDetailComponent } from './file-detail/file-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MessagesComponent } from './messages/messages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderService} from "./services/order.service";
import {FileService} from "./services/file.service";
import {NgxPaginationModule} from 'ngx-pagination';
import {AngularFileUploaderModule} from "angular-file-uploader";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DragAndDropDirective } from './modules/__shared-utilities/drag-and-drop-directive/drag-and-drop-.directive';
import {DatePipe} from '@angular/common';
import { ExcelExportComponent } from './excel-export/excel-export.component';
import {OAuthModule} from "angular-oauth2-oidc";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    OrderListComponent,
    NavmenuComponent,
    FileDetailComponent,
    OrderDetailComponent,
    MessagesComponent,
    FileUploadComponent,
    DragAndDropDirective,
    ExcelExportComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    OAuthModule,
    OAuthModule.forRoot()

  ],
  providers: [OrderService, FileService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
