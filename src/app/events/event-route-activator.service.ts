import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EventsService } from '../shared/events.service';

@Injectable()
export class EventRouteActivatorService implements CanActivate {
  constructor(private router: Router, private eventsService: EventsService) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    const eventExist = !!this.eventsService.getEvent(
      +route.params['id']
    );

    if (!eventExist) {
      this.router.navigate(['/404']);
    }

    return eventExist;
  }
}