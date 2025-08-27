import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { v4 as UUIDv4 } from "uuid";
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.MAPBOX_KEY;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  markers = signal<Marker[]>([]);

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  zoom = signal(14);

  coordinates = signal({
    lng: -56.19730632683175,
    lat: -34.90383036077189,
  });

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    const { lng, lat } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: this.zoom(),
    });

    /* const marker = new mapboxgl.Marker({
      draggable: false
    })
      .setLngLat([lng, lat])
      .addTo(map);

    marker.on('dragend', (event) => {
      console.log(event);
    }); */

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;
    const map = this.map()!;
    const color = '#xxxxxx'.replace(/x/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const coords = event.lngLat;
    const marker = new mapboxgl.Marker({
      color,
    })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: marker ,
    };

    //this.markers.set([newMarker, ...this.markers()]); esto es lo mismo que con el update
    this.markers.update((current) => [newMarker, ...current]);

    //console.log(this.markers());
  }

  flyToMarker(lnglat: LngLatLike) {
    if (!this.map()) return;
    this.map()?.flyTo({
      center: lnglat,
      animate: true
    })
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;
    const map = this.map()!;

    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter(m => m.id !== marker.id));
  }

  }
