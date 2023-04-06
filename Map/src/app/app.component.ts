import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResortDataService } from './resort-data.service';
import * as maptalks from 'maptalks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Map';
  url = 'https://www.clubmahindra.com/storage/app/media';
  constructor(private http: HttpClient, private resoorts: ResortDataService) {}
  map: any;
  resortdata: any[] = [];
  ngOnInit(): void {
    // this.resoorts.getdata().subscribe((res: any) => {
    //   console.log(res);
    //   this.http.get('assets/resort.json').subscribe((result: any) => {
    //     res.map((obj1: any) => {
    //       const obj2 = result.find((obj2: any) => {
    //         if (obj2.CREST_ResortID == obj1.resortId) {
    //           this.resortdata = obj1;
    //           console.log(this.resortdata);
    //         }
    //       });
    //     });
    //   });
    // });

    // this.http.get('assets/resort.json').subscribe((result: any) => {
    //   console.log(result);

    //   var markers = [];
    //   for (var i = 0; i < result.length; i++) {
    //     var latlong = result[i].latlong.split(',');
    //     var longitude = parseFloat(latlong[1]);
    //     var latitude = parseFloat(latlong[0]);

    //     // Check if the latitude and longitude are valid numbers
    //     if (!isNaN(latitude) && !isNaN(longitude)) {
    //       var coordinates = [longitude, latitude];

    //       var marker = new maptalks.Marker(coordinates, {
    //         visible: true,
    //         editable: true,
    //         cursor: 'pointer',
    //         draggable: false,
    //         dragShadow: false,
    //         drawOnAxis: null,
    //         symbol: {
    //           markerFile: './assets/marks.png',
    //           markerWidth: 40,
    //           markerHeight: 40,
    //           markerDx: 0,
    //           markerDy: 0,
    //           markerOpacity: 1,
    //         },
    //       });

    //       var popupContent = '<div>' + result[i].ResortName + '</div>';
    //       marker.setInfoWindow({
    //         title: popupContent,
    //         content: 'heello',
    //       });

    //       markers.push(marker);
    //     }
    //   }

    //   var vectorLayer = new maptalks.VectorLayer('vector', markers).addTo(map);
    // });

    this.resoorts.getdata().subscribe((res: any) => {
      console.log(res);
      this.http.get('assets/resort.json').subscribe((result: any) => {
        const vectorLayer = new maptalks.VectorLayer('vector');
        result.forEach((obj2: any) => {
          const matchedResort = res.find(
            (obj1: any) => obj1.resortId === obj2.CREST_ResortID
          );
          if (matchedResort) {
            var latlong = obj2.latlong.split(',');
            var longitude = parseFloat(latlong[1]);
            var latitude = parseFloat(latlong[0]);

            // Check if the latitude and longitude are valid numbers
            if (!isNaN(latitude) && !isNaN(longitude)) {
              var coordinates = [longitude, latitude];

              var marker = new maptalks.Marker(coordinates, {
                visible: true,
                editable: true,
                cursor: 'pointer',
                draggable: false,
                dragShadow: false,
                drawOnAxis: null,
                symbol: {
                  markerFile: './assets/marks.png',
                  markerWidth: 40,
                  markerHeight: 40,
                  markerDx: 0,
                  markerDy: 0,
                  markerOpacity: 1,
                },
              });


              console.log('' + matchedResort.resortImages[0], 'sd');
              marker.setInfoWindow({
                title:"",
                content:
                  `<img style="display:block;margin:auto;" src="${matchedResort.resortImages[0]}" width="200px" height="120px">`+'<h2>' + obj2.ResortName + '</h2>'
              });

              vectorLayer.addGeometry(marker);
            }
          }
        });
        map.addLayer(vectorLayer);
      });
    });

    var map = new maptalks.Map('map', {
      center: [72.8388, 22.68772],
      zoom: 5,
      minZoom: 4,
      pitch: 50,
      overviewControl: true,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate:
          'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],

        attribution:
          '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',

        cssFilter:
          'invert(98%) sepia(15%) saturate(9%) hue-rotate(173deg) brightness(101%) contrast(103%)',
      }),
    });
    map.setBearing(20);

    var vectorLayer = new maptalks.VectorLayer('vector1');
    console.log(map.getExtent(), 'Extent detail');
  }
}
