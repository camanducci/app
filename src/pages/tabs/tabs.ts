import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { EducationPage } from '../education/education';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EducationPage;
  tab3Root = ProfilePage;

  constructor(public platform : Platform) {}

  backButtonAction(){
    this.platform.exitApp();
  }
}
