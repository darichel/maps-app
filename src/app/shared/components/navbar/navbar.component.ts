import { Component, inject, Type } from '@angular/core';
import {
  NavigationEnd,
  Resolve,
  ResolveFn,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from "@angular/core/rxjs-interop";

import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  router = inject(Router);

  routes = routes
    .filter((route) => route.path !== '**')
    .map((route) => ({
      path: route.path,
      title: `${route.title ?? 'Mapas en Angular'}`,
    }));

  //Titulo como observable
  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event.url),
    map((url) => routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas')
  );

  //Titulo como señal
  /* pageTitle = toSignal(this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event.url),
    map((url) => routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas')
  )); */
}

