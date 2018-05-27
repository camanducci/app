import { Component } from '@angular/core';
import { App, NavController,NavParams,AlertController,ModalController,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WelcomePage } from '../welcome/welcome';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  User: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app : App ,
    public request: RestProvider,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    this.User = {email:'',data:{plan:'free'}}
  }

  ionViewDidLoad()
  {
    this.loadThisPageBitch();

  }

  loadThisPageBitch(){

  }

  goToPage(Page) {
    let myModal = this.modalCtrl.create(Page);
    myModal.present();
  }

  referencialCode() {
    var number = Math.floor(Math.random()*90000) + 10000;
    var message = "Seu código referencial é: <br> <h1>"+number+"</h1>";
    this.alertCtrl.create({
      subTitle: message,
      cssClass: 'centeralizad',
      buttons: ['Ok']
    }).present();
  }

  promocionalCode() {
    let self = this;
    this.alertCtrl.create({
      title: 'Informe seu código promocional',
      inputs: [
        {
          name: 'code',
          placeholder: 'Código',
          type: 'text'
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ativar',
          handler: data => {
            if(!data.code)
              return false;
            if(data.code)
            {
              this.toastCtrl.create({ duration: 3000, position: 'bottom', showCloseButton : true, closeButtonText: "OK", cssClass: "-toast-success" })
              .setMessage('Código referêncial aceito')
              .present();    
              this.loadThisPageBitch();
            }
          }
        }
      ]
    }).present();
  }

  cancelarAssinatura() {
    let self = this;
    this.alertCtrl.create({
      title: 'Você quer realmente cancelar sua assinatura ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            // if(!data.code)
            //   return false;
            // if(data.code)
            // {
            //   this.request.invite(data.code)
            //   .then((result: any) => {
            //     this.toastCtrl.create({ duration: 3000, position: 'bottom', showCloseButton : true, closeButtonText: "OK", cssClass: "-toast-success" })
            //     .setMessage('Código referêncial aceito')
            //     .present();    
            //     this.loadThisPageBitch();
            //   })
            //   .catch((error: any) => {
            //     this.toastCtrl.create({ duration: 3000, position: 'bottom', showCloseButton : true, closeButtonText: "OK", cssClass: "-toast-error" })
            //       .setMessage(error[0])
            //       .present();
            //     return false;
            //   });
            // }
          }
        }
      ]
    }).present();
  }

  public signOut() {
    this.authService.signOut();
    this.app.getRootNav().setRoot(WelcomePage);
  }
}
