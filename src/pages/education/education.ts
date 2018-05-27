import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'Av. Braz Leme, 1000 - Santana, São Paulo - SP';
  end = 'Estação Barra Funda';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: {lat: -23.508521, lng: -46.651327}
    });
    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    console.log( this.start );
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log(response)
        // window.alert('Directions request failed due to ' + status);
      }
    });
  }

}