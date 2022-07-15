import { Component, OnInit } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
  }

  getUserName(){
    const claims = this.oauthService.getIdentityClaims();
    if(!claims){
      return null;
    }
    return claims['name'];
  }

  logout(){
    this.oauthService.logOut();
  }
}
