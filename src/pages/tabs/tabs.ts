import { Component } from '@angular/core';
import { CashPage } from '../cash/cash';
import { ProfilePage } from '../profile/profile';
import { EducationPage } from '../education/education';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CashPage;
  tab2Root = EducationPage;
  tab3Root = ProfilePage;

  constructor(public platform : Platform) {}

  backButtonAction(){
    this.platform.exitApp();
  }
}
