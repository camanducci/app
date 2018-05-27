import {Component, ElementRef, ViewChild} from '@angular/core';
import {Platform} from "ionic-angular";
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent} from "@ionic-native/google-maps";

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  @ViewChild('map')
  private mapElement:ElementRef;
  private map:GoogleMap;
  private location:LatLng;

  constructor(private platform:Platform,
              private googleMaps:GoogleMaps) {
    this.location = new LatLng(42.346903, -71.135101);
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 8
        };

        this.map.moveCamera(options);
        setTimeout(() => {this.addMarker()}, 2000);
      });
    });
  }

  addMarker() {
    this.map.addMarker({
      title: 'My Marker',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    })
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('Marker Clicked');
      });
    });
  }
}