import { Component, ViewChild } from '@angular/core';
import { App, NavController,ActionSheetController,ModalController,ViewController,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-cash',
  templateUrl: 'cash.html'
})

export class CashPage {

  List : any[];
  ListAnalyze : any[];

  constructor(
    private app : App ,
    public navCtrl: NavController,
    private authService: AuthServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
  ) {
    this.List = [
      {
        'name' : 'R$ 27,30',
        'icon' : 'ios-cash',
        'text' : 'Saldo',
      },
      {
        'name' : 'R$ 107,90',
        'icon' : 'ios-card',
        'text' : 'Bilhete único',
      },
    ]
  }

  modalhide() {
    this.viewCtrl.dismiss();
  }

  historic()
  {
    this.goToPage(HomePage);
  }

  presentConfirm() {
    let self = this;
    let alert = this.alertCtrl.create({
      title: 'Deseja sacar este dinheiro?',
      // message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Prosseguir',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  goToPage(Page,obj={}) {
    let myModal = this.modalCtrl.create(Page,obj);
    myModal.present();
  }
}