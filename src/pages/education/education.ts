import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, ModalController, AlertController, NavController } from 'ionic-angular';
import { ResultPage } from '../result/result';

declare var google;

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  result: any;
  modalPage : any;
  search: boolean;
  start = 'Av. Braz Leme, 1000 - Santana, São Paulo - SP';
  end = 'Estação Barra Funda, SP';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.result = {
      distance : 0,
      time : 0,
    }
  }

  ionViewDidLoad(){
    this.search = true;
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: {lat: -23.508521, lng: -46.651327}
    });
    this.directionsDisplay.setMap(this.map);
  }


  modal(Page) 
  {
    this.modalPage = this.modalCtrl.create(Page);
    this.modalPage.present();
  }


  calculateAndDisplayRoute() {
    let self = this;
    self.directionsService.route({
      origin: self.start,
      destination: self.end,
      travelMode: 'DRIVING'
    }, (response, status) => {

      if (status === 'OK') {
        self.presentActionSheet({
          distance : response.routes[0].legs[0].distance.text,
          time : response.routes[0].legs[0].duration.text,
        })
        self.directionsDisplay.setDirections(response);
      } else {
        console.log(response)
      }
    });
  }

  define(data : object)
  {
    this.search = false;
    this.result = data;
  }

  finish()
  {
    this.modal(ResultPage);
    this.search = true;
    // this.congratulations({distance:this.result.distance});
  }

  presentActionSheet(data : object) {
    let self = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Compartilhe',
      buttons: [
        {
          text: 'Adicionar novo',
          icon: 'ios-add',
          handler: () => {
            self.define(data);
          }
        },{
          text: 'Denis Magalhães - 111505945',
          icon: 'ios-card',
          handler: () => {
            self.define(data);
          }
        },{
          text: 'Denis Magalhães - 177805945',
          icon: 'ios-card',
          handler: () => {
            self.define(data);
          }
        }
      ]
    });
    actionSheet.present();
  }


}