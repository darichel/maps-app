import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.MAPBOX_KEY;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    .mapContainer {
      width: 100vw;
      height: calc(100vh - 64px);
    }
  `,
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  async ngAfterViewInit() {

    if(!this.divElement()) return;

    await new Promise(resolve => setTimeout(resolve, 100));

    const element = this.divElement()! .nativeElement

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
