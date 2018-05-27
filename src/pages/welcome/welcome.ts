import { Component, ViewChild } from '@angular/core';
import { NavController,ModalController,Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SigninPage } from '../signin/signin';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  modalPage : any;
  constructor(
    public request: RestProvider,
    public modalCtrl: ModalController,
    public platform: Platform, 
  ) {}


  modal(Page) {
    this.modalPage = this.modalCtrl.create(Page);
    this.modalPage.present();
  }

  login() {
    this.modal(LoginPage)
  }

  signin() {
    this.modal(SigninPage)
  }

  backButtonAction(){
    this.platform.exitApp();
  }
}