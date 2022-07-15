import { Component } from '@angular/core';
import {OAuthService, AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: 'https://dev-20674828.okta.com/oauth2/default',
  redirectUri: 'http://mldemo.com',
  clientId: '0oa5sucjnlEASHtsM5d7',

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'optar-tl-upload';
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oauthService.initImplicitFlow();
  }
  logout(){
    this.oauthService.logOut();
  }
  getUserName(){
   const claims = this.oauthService.getIdentityClaims();
   if(!claims){
     return null;
   }
   return claims['name'];
  }
}
