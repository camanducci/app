import { Component, ViewChild } from '@angular/core';
import { App, NavController,ActionSheetController,ModalController,ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

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
        'name' : 'Estação Itaquera - Guaianases',
        'icon' : 'ios-bicycle',
        'text' : '4 km',
        'color' : 'red',
        'date' : '27/04/2018'
      },
      {
        'name' : 'Av Brás Leme - Estação Barra Funda',
        'icon' : 'ios-bicycle',
        'text' : '3,5 km',
        'color' : 'red',
        'date' : '27/05/2018'
      },
      {
        'name' : 'Itaquera - Barra Funda',
        'icon' : 'ios-bicycle',
        'text' : '12 km',
        'color' : 'success',
        'date' : '21/05/2018'
      },
      {
        'name' : 'Itaim Paulista - Itaquera',
        'icon' : 'ios-bicycle',
        'text' : '10,9 km',
        'color' : 'red',
        'date' : '16/05/2018'
      },
      {
        'name' : 'Barra Funda - Itaquera',
        'icon' : 'ios-bicycle',
        'text' : '25 km',
        'color' : 'red',
        'date' : '14/05/2018'
      },
      {
        'name' : 'Itaquera - Barra Funda',
        'icon' : 'ios-bicycle',
        'text' : '25 km',
        'color' : 'success',
        'date' : '10/04/2018'
      },
      {
        'name' : 'São Miguel - Itaquera',
        'icon' : 'ios-bicycle',
        'text' : '6,9 km',
        'color' : 'red',
        'date' : '09/04/2018'
      },
      {
        'name' : 'Guarulhos - Itaquera',
        'icon' : 'ios-bicycle',
        'text' : '13 km',
        'color' : 'success',
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