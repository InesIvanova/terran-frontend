import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Token } from '../models/token';
import { Router } from '@angular/router';

const path = environment.apiUrl;
const loginUrl = path + 'accounts/rest-auth/login/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) { }

  login(data): Observable<Token> {
    this.isLoggedIn.next(true)
    return this.http.post<Token>(loginUrl, data);
  }

  isAuthenticated() {
    if (this.checkToken()) {
      return true
     }
      return false;
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login'])
  }
}
