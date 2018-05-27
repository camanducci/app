import { Component,ViewChild } from '@angular/core';
import { App,Platform,Alert,NavController,NavParams,Slides, LoadingController,ActionSheetController,ToastController,ViewController } from 'ionic-angular';
import { Ionic2Rating } from 'ionic2-rating';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {

  @ViewChild('slider') slider: Slides;
  Form: object;
  finish: boolean;
  number: number;
  numberFinal: number;
  Labels: object;
  Timer : any;
  DataParams : any;
  constructor(
    public navCtrl: NavController, 
    public loading: LoadingController, 
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    private app: App,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {
      this.DataParams = navParams.get('data');
      this.Timer = { startTime : 0, start : 0, end : 0, diff : 0, timerID : 0 }
      this.finish = false;
      this.Form = {
        document : "", 
        password : "", 
      };
      this.Labels = {
        next : "Prosseguir", 
        back : "Voltar", 
      };
   }

  ionViewDidLoad(){
    this.chronoReset();
    this.chrono();
  }

  clock()
  {
    let self = this;
    self.number = 1;
    setTimeout(function() {
      self.number  = self.number + 1;
    }, 1000);
  }

  submit(){
    this.chronoStop();
    this.finish = true;
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

  chrono(){
    this.Timer.end = new Date()
    this.Timer.diff = this.Timer.end - this.Timer.start
    this.Timer.diff = new Date(this.Timer.diff);
    var msec = this.Timer.diff.getMilliseconds()
    var sec = this.Timer.diff.getSeconds()
    var min = this.Timer.diff.getMinutes()
    var hr = this.Timer.diff.getHours()-1
    if (min < 10){
      min = "0" + min
    }
    if (sec < 10){
      sec = "0" + sec
    }
    if(msec < 10){
      msec = "00" +msec
    }
    else if(msec < 100){
      msec = "0" +msec
    }
    document.getElementById("chronotime").innerHTML = min + ":" + sec + ":" + msec
    let self = this;
    this.Timer.timerID = setTimeout(function() {
      self.chrono();
    }, 10);
  }
  
  chronoStart(){
    this.chrono()
  }
  dt : any;
  chronoContinue(){
    this.dt = new Date();
    this.Timer.start = this.dt-this.Timer.diff
    this.Timer.start = new Date(this.Timer.start)
    this.chrono()
  }
  chronoReset()
  {
    document.getElementById("chronotime").innerHTML = "00:00:000"
    this.Timer.start = new Date()
  }
  chronoStop(){
    clearTimeout(this.Timer.timerID)
  }

  thanks(){
    console.log("djsdjjdsds");
  }
}