import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, ModalController, AlertController, NavController, LoadingController } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

declare var google;

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  Loading : any;
  result: any;
  modalPage : any;
  search: boolean;
  bora: boolean;
  params: any;
  start = 'Av. Braz Leme, 1000 - Santana, São Paulo - SP';
  end = 'Estação Barra Funda, SP';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private launchNavigator: LaunchNavigator
  ) {
    this.result = {
      distance : 0,
      time : 0,
    }
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.search = true;
    this.bora = false;
    this.map = null;
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: {lat: -23.508521, lng: -46.651327}
    });
    this.directionsDisplay.setMap(this.map);
  }


  modal(Page,obj={}) 
  {
    let self = this;
    this.modalPage = this.modalCtrl.create(Page,obj);
    this.modalPage.onDidDismiss(data => {
      self.directionsDisplay.setDirections({routes: []});
    });
    this.modalPage.present();
  }
  

  presentConfirm() {
    let self = this;
    let alert = this.alertCtrl.create({
      title: 'Distância de 15 km <br> Cerca de 3 min',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            self.initMap();
          }
        },
        {
          text: 'Bora',
          handler: () => {
            self.boraLa();
          }
        }
      ]
    });
    alert.present();
  }

  public LoadingStart(message="Carregando") {
    if (!this.Loading) {
      this.Loading = this.loadingCtrl.create({
        content: message
      });
    }
    this.Loading.present();
  }

  public LoadingEnd(){
    if(this.Loading){
      this.Loading.dismiss();
    }
    this.Loading = null;
  }

  calculateAndDisplayRoute() {
    let self = this;
    self.LoadingStart('Calculando rota');
    self.directionsService.route({
      origin: self.start,
      destination: self.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        self.define({
          distance : response.routes[0].legs[0].distance.text,
          time : response.routes[0].legs[0].duration.text,
        });
        self.directionsDisplay.setDirections(response);
        self.bora = true;
        self.search = false;
        self.LoadingEnd();
      } else {
        self.LoadingEnd();
      }
    });
  }

  define(data : object)
  {
    this.search = false;
    this.result = data;
  }

  boraLa()
  {
    let self = this;
    self.LoadingStart('Aproxime o bilhete único');
    setTimeout(() => {
      self.LoadingEnd();
      self.preFinish();
    }, 3000);
  }

  preFinish()
  {
    let self = this;
    self.bora = false;
    self.search = false;
    self.finish();
    let options: LaunchNavigatorOptions = {
      start: self.start,
      destinationName: self.end,
      transportMode: 'bicycling',
      app: self.launchNavigator.APP.GOOGLE_MAPS
    };
    self.launchNavigator.navigate(self.end, options)
    .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
    );
  }
  finish()
  {
    this.modal(ResultPage,{data:this.result});
    this.search = true;
    // this.congratulations({distance:this.result.distance});
  }

  presentActionSheet(data : object) {
    let self = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha o cartão',
      buttons: [
        {
          text: 'Usar NFC',
          icon: 'ios-barcode-outline',
          handler: () => {
            self.boraLa();
          }
        },{
          text: 'Adicionar novo',
          icon: 'ios-add',
          handler: () => {
            self.preFinish();
          }
        },{
          text: 'Denis Magalhães - 111505945',
          icon: 'ios-card',
          handler: () => {
            self.preFinish();
          }
        },{
          text: 'Denis Magalhães - 177805945',
          icon: 'ios-card',
          handler: () => {
            self.preFinish();
          }
        }
      ]
    });
    actionSheet.present();
  }


}