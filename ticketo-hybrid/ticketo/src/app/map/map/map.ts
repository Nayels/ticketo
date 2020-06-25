import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { FirebaseProvider } from "../../shared/firebase/firebase.provider";
import { GeolocationProvider } from "../../shared/geolocation/geolocation.provider";

@Component({
  selector: 'sg-page-map',
  templateUrl: 'map.html',
  providers: [FirebaseProvider, GeolocationProvider]
})
export class MapPageComponent {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  geodata;  // Observable wich can get bigger or smaller

  constructor(
    private firebase : FirebaseProvider,
    private geolocation: GeolocationProvider
  ) {
    mapboxgl.accessToken = "pk.eyJ1IjoibmF5M2xzIiwiYSI6ImNqaDkwdjF6ZzA2a2kzOW9pcjdoaWpuZ3AifQ._tWIMWsZAiTr-D2nVwcYtQ";
  }

  ionViewDidLoad() {
    this.getFirebaseData();
    this.buildMap();
  }

  getFirebaseData() {
    this.firebase.getRef().on('value', snapshot => {
      let data = snapshot.val();

      this.geodata = {
        type: 'FeatureCollection',
        crs: {
          type: 'name',
          properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}
        },
        features: []
      };

      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          data[key].id = key;

          this.geodata.features = [];
          this.geodata.features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [data[key].long, data[key].lat, 0]
            },
            properties: {
              id: data[key].id
            }
          });
        }
      }

      return this.geodata;
    });
  }

  buildMap() {
    this.geolocation.getCurrentCoordinations().then((resp) => {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [resp.coords.longitude, resp.coords.latitude]

      });

      this.map.on('load', () => {
        this.setMapSource(this.map);
        this.setMapLayers(this.map);
      });
    });
  }


  private setMapSource(map){
    map.addSource("photos", {
      type: "geojson",
      data: this.geodata,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
  }

  private setMapLayers(map) {
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "photos",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6", 100, "#f1f075", 750, "#f28cb1"
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"], 20, 100, 30, 750, 40
        ]
      }
    });

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "photos",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });

    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "photos",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    });
  }
}
