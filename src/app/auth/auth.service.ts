import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {};

  getToken(){
    return this.token;
  }

  getAuthStatusListner(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  createUser(email: string, password: string){
    const authData : AuthData = {
      email: email,
      password: password
    };
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string){
    const authData : AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const exprationData = new Date( now.getTime() + (expiresInDuration * 1000));
          this.saveAuthDate(token, exprationData);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo) return;
    const now = new Date();
    const expireIn = authInfo.expirationData.getTime() - now.getTime();
    if(expireIn > 0){
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expireIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    },duration * 1000);
  }
  private saveAuthDate(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if(!token || ! expirationDate) return {};

    return {
      token: token,
      expirationData: new Date(expirationDate)
    }
  }
}
