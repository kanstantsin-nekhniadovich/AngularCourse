import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventsService } from '../shared';

@Injectable()
export class EventResolverService implements Resolve<any>{

  constructor(private eventsService: EventsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.eventsService.getEvent(route.params['id']);
  }

}