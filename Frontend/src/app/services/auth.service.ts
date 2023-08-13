import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../model/loginData.model';
import { SignUpData } from '../model/signUpData.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8082/api/v1.0/shopping';

  constructor(private http: HttpClient) { }

  loginService(loginData: LoginData) {
    return (this.http.post(this.url + '/login', loginData));
  }

  registerService(regData: SignUpData) {
    return (this.http.post(this.url + '/register', regData));
  }

  resetPassword(passData: LoginData) {
    const logId = passData.loginId;
    const newUrl = this.url +'/'+ logId + '/forgot';
    return (this.http.put(newUrl, passData));
  }

  isUserLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  isRoleAdmin() {
    const adminRole = localStorage.getItem('role');
    return adminRole === 'ROLE_ADMIN';
  }

  isRoleUser() {
    const userRole = localStorage.getItem('role');
    return userRole === 'ROLE_USER';
  }

  getCurrentUserRole() {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      return userRole;
    } else {
      return '';
    }
  }

  userLogout() {
    localStorage.clear();
  }

  getUserToken() {
    const token = localStorage.getItem('token');
    const finalToken = 'Bearer ' + token;
    return finalToken;
  }

  getUserName(){
    return localStorage.getItem('userName');
  }


}

