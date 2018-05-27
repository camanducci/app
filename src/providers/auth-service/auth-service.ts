import { Injectable } from '@angular/core';
//import { User } from './user';

@Injectable()
export class AuthServiceProvider {

  constructor() { }

  store(obj) {
    return localStorage.setItem('AUTH', JSON.stringify(obj));
  }

  getUser() {  
    return (this.checkAuth()) ? JSON.parse(localStorage.getItem('AUTH')) : {};
  }

  checkAuth() {  
    return !(localStorage.getItem('AUTH') == null);
  }

  createUser(user) {
    return true;
  }

  currentUser() {
    return true;
  }  

  signIn(user) {
    return true;
  }

  signOut() {
    localStorage.setItem("AUTH", null)
    localStorage.removeItem("AUTH");
    localStorage.clear();
    return true;
  }

  resetPassword(email: string) {
    return true;
  }
}
