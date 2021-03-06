import { Routes } from '@angular/router';
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsResolverService,
  CreateSessionComponent,
  EventResolverService
} from './events';
import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['createDeactiveRoute'] },
  { path: 'events/new/session', component: CreateSessionComponent },
  {
    path: 'events', component: EventsListComponent, resolve: {
      events: EventsResolverService
    }
  },
  { path: 'event/:id', component: EventDetailsComponent, resolve: { event: EventResolverService } },
  { path: '404', component: Error404Component, pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '', redirectTo: 'events', pathMatch: 'full' }
]
