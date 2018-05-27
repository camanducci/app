import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BackButtonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackButtonProvider {

  public active: boolean = false;
  
  constructor() {
    console.log('Hello BackbuttonServiceProvider Provider');
  }

  public setActive() {
    this.active = !this.active;
  }

  public isActive() {
    return this.active;
  }

}
