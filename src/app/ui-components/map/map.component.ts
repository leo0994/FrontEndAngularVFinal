
import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    const mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(10.0, -84.0), // Center of Costa Rica
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(this.map);

    const request = {
      origin: 'Liberia, Guanacaste',
      destination: 'Limón, Costa Rica',
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result: any, status: string) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  }
}
