import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { Location } from '@angular/common';
import { File } from '../common/file';
import { DatePipe } from '@angular/common';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
  file: File | null;
  tlNum: string;
  uic: string;


  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private location: Location,
    public datepipe: DatePipe,
    private oauthService: OAuthService
  ) {
    this.file = null;
    this.tlNum = "";
    this.uic = "";
  }

  getUserName(){
    const claims = this.oauthService.getIdentityClaims();
    if(!claims){
      return null;
    }
    return claims['name'];
  }

  ngOnInit(): void {
    this.getFile();
  }

  getFile(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if(id){
      this.fileService.getFile(id).subscribe(file => this.file = file);
    }else{
      this.file = null;
    }
  }

  addTL(newItem: string) {
    this.tlNum = newItem;
  }

  addUic(newItem: string){
    this.uic = newItem;
  }

  fixDate(date: string){
    return this.datepipe.transform(date, 'MM/dd/yyyy @ h:mm a')
  }

  close(): void {
    this.location.back();
  }
}
