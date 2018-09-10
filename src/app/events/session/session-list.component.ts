import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../';
import { AuthService } from '../../user/auth.service';
import { VotedService } from '../voted.service';

@Component({
  selector: 'session-list',
  templateUrl: 'session-list.template.html'
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filteredBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];

  constructor(private authService: AuthService, private votedService: VotedService) { }

  ngOnChanges() {
    if (this.sessions) {
      this.filterSession(this.filteredBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByName) : this.visibleSessions.sort(sortByVotes)
    }
  }

  filterSession(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => session.level.toLocaleLowerCase() === filter);
    }
  }

  userHasVoted(session: ISession) {
    return this.votedService.userHasVoted(session, this.authService.currentUser.userName);
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.votedService.removeVote(session, this.authService.currentUser.userName);
    } else {
      this.votedService.addVote(session, this.authService.currentUser.userName);
    }

    if (this.sortBy === 'vote') {
      this.visibleSessions.sort(sortByVotes);
    }
  }
}

function sortByName(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  if (s1.name === s2.name) return 0;
  if (s1.name < s2.name) return -1;
}

function sortByVotes(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}