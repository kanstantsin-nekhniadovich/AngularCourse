import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../shared/events.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../../shared';

@Component({
  templateUrl: 'event-details.component.html',
  styles: [`
    .container {padding-left: 20px; padding-right: 20px;}
    .event-image {height: 100px;}
    .add-session-link {cursor: pointer; float: right;}
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
    this.event = this.eventsService.getEvent(
      +this.route.snapshot.params['id']
    );
  }

  addNewSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    let id = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = id++;
    this.event.sessions.push(session);
    this.eventsService.updateEvent(this.event);
    this.addMode = false;
  }

  cancel() {
    this.addMode = false;
  }

}