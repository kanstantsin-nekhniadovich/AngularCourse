import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../shared/events.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../../shared';

@Component({
  templateUrl: 'event-details.component.html',
  styles: [`
    .container {padding-left: 20px; padding-right: 20px;}
    .event-image {height: 100px;}
    .add-session-link {cursor: pointer;}
  `]
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filteredBy: string = 'all';
  sortBy: string = 'votes';
  constructor(private eventsService: EventsService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.event = data['event'];
      this.addMode = false;
    });
  }

  addNewSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    let id = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = id++;
    this.event.sessions.push(session);
    this.eventsService.saveEvent(this.event).subscribe(() => {
      this.addMode = false;
    });
  }

  cancel() {
    this.addMode = false;
  }

}