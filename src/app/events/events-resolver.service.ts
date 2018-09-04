import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventsService } from '../shared/events.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IEvent } from '../shared'

@Injectable()
export class EventsResolverService implements Resolve<any>{

  constructor(private eventsService: EventsService) {

  }

  resolve(): Observable<IEvent[]> {
    return this.eventsService.getEvents().pipe(map(events => events));
  }
}