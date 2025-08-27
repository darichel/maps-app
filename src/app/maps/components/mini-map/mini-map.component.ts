import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { HouseProperty } from '../../../interfaces/HauseProperty';
import { environment } from '../../../../environments/environment.development';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';

mapboxgl.accessToken = environment.MAPBOX_KEY;


@Component({
  selector: 'app-mini-map',
  imports: [],
  template: `
    <div #map class="w-[100%] h-[260px] bg-amber-200">hola</div>
  `,
})
/**
 * Width 100%
 * height 260px
 */
export class MiniMapComponent implements AfterViewInit {

  lnglat = input.required<LngLatLike>();
  zoom = input<number>(14);

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit(){
    if (!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 100));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
      pitch: 30
    });

    new mapboxgl.Marker().setLngLat(this.lnglat()).addTo(map);
  }

}
