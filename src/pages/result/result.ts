import { Component,ViewChild } from '@angular/core';
import { App,Platform,Alert,NavController, Slides, LoadingController,ActionSheetController,ToastController,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {

  @ViewChild('slider') slider: Slides;
  Form: object;
  Labels: object;

  constructor(
    public navCtrl: NavController, 
    public loading: LoadingController, 
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    private app: App,
    public actionSheetCtrl: ActionSheetController
  ) {
      this.Form = {
        document : "", 
        password : "", 
      };
      this.Labels = {
        next : "Prosseguir", 
        back : "Voltar", 
      };
   }
  
  backButtonAction(){
    this.modalhide();
  }
  
  ngAfterViewInit() {
    // child is set
    this.slider.lockSwipes(true);
  }

  goToSlide(number) {
    this.slider.lockSwipes(false);
    this.slider.slideTo(number,700);
    this.slider.lockSwipes(true);
  }

  nextSlide(type='next') {
    this.slider.lockSwipes(false);
    var number = ( type == 'next') ? (this.slider.getActiveIndex()+1) : (this.slider.getActiveIndex()-1) ;
    this.slider.slideTo( number,700);
    this.slider.lockSwipes(true);
  }

  backSlide() {
    this.slider.lockSwipes(false);
    this.slider.slideTo( (this.slider.getActiveIndex()-1),700);
    this.slider.lockSwipes(true);
  }
  
  modalhide() {
    this.viewCtrl.dismiss();
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Compartilhe',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.finally();
          }
        },{
          text: 'Linkedin',
          icon: 'logo-linkedin',
          handler: () => {
            this.finally();
          }
        },{
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.finally();
          }
        }
      ]
    });
    actionSheet.present();
  }

  finally() 
  { 
    this.toastCtrl.create({ duration: 3000, position: 'bottom', showCloseButton : true, closeButtonText: "OK", cssClass: "-toast-success" })
      .setMessage('Bem-vindo')
      .present();          
  }
}