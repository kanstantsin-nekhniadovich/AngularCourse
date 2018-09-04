import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './user/auth.service';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsService,
  EventRouteActivatorService,
  EventsResolverService
} from './events';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { Error404Component } from './errors/404.component';

import { ToastrService } from './common/toastr.service';

import { appRoutes } from './routes';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventsService,
    ToastrService,
    EventRouteActivatorService,
    { provide: 'createDeactiveRoute', useValue: checkIsDirty },
    EventsResolverService,
    AuthService],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkIsDirty(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('Do you really want to save?');
  }

  return true;
}