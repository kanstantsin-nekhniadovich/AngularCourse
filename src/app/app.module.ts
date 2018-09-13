import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsResolverService,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  VotedService,
  EventResolverService
} from './events';

import {
  EventsService,
  DurationPipe
} from './shared'

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { Error404Component } from './errors/404.component';
import {
  TOASTR_TOKEN,
  IToastr,
  CollapsibleWellComponent,
  JQ_TOKEN,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common';

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
    ModalTriggerDirective,
    UpvoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventsService,
    {
      provide: TOASTR_TOKEN, useValue: toastr
    },
    {
      provide: JQ_TOKEN, useValue: jquery
    },
    { provide: 'createDeactiveRoute', useValue: checkIsDirty },
    EventsResolverService,
    EventResolverService,
    VotedService,
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