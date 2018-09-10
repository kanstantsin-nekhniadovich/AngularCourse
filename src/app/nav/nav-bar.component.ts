import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { EventsService, ISession } from '../shared';

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.component.html',
  styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm {display: none;}}
    li > a.active {color: #F97924;}
  `]
})
export class NavBarComponent {
  foundSessions: ISession[];
  searchTerm: string = '';
  constructor(private authService: AuthService, private eventsService: EventsService) {

  }

  searchSessions(searchTerm) {
    this.eventsService.searchSession(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}