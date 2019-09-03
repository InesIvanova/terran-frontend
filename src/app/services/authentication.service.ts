import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token';

const path = environment.apiUrl;
const loginUrl = path + 'accounts/rest-auth/login/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(data): Observable<Token> {
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
    localStorage.removeItem('token');
  }
}
