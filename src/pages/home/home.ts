import { Component, ViewChild } from '@angular/core';
import { App, NavController,ActionSheetController,ModalController,ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  List : any[];
  ListAnalyze : any[];

  constructor(
    private app : App ,
    public navCtrl: NavController,
    private authService: AuthServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
  ) {
    this.List = [
      {
        'name' : 'Itaquera - Brás',
        'icon' : 'ios-bicycle',
        'text' : '8 km',
        'date' : '11/04/2018'
      },
      {
        'name' : 'Itaquera - Barra Funda',
        'icon' : 'ios-bicycle',
        'text' : '12 km',
        'date' : '10/04/2018'
      },
      {
        'name' : 'Guarulhos - Itaquera',
        'icon' : 'ios-bicycle',
        'text' : '13 km',
        'date' : '08/04/2018'
      }
    ]
  }

  modalhide() {
    this.viewCtrl.dismiss();
  }

  goToPage(Page,obj={}) {
    let myModal = this.modalCtrl.create(Page,obj);
    myModal.present();
  }
}