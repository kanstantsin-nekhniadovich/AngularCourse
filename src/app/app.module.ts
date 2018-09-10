import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsService,
  EventRouteActivatorService,
  EventsResolverService,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe
} from './events';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { Error404Component } from './errors/404.component';
import { TOASTR_TOKEN, IToastr, CollapsibleWellComponent, JQ_TOKEN, SimpleModalComponent, ModalTriggerDirective } from './common';

import { appRoutes } from './routes';

let toastr: IToastr = window['toastr'];
let jquery: Object = window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventsService,
    {
      provide: TOASTR_TOKEN, useValue: toastr
    },
    {
      provide: JQ_TOKEN, useValue: jquery
    },
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