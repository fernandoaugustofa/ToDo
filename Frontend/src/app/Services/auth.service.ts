import { Injectable } from '@angular/core';
import { user } from '../Model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseurl = 'http://localhost:8081/user/';
  constructor(private http: HttpClient, public router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  SingIn(data: any) {
    return this.http
      .post<user>(
        this.baseurl+'authenticate',
        JSON.stringify(data),
        this.httpOptions
      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
