import { Injectable } from '@angular/core';
import { ISession } from '../shared';

@Injectable()
export class VotedService {

  userHasVoted(session: ISession, username: string) {
    return session.voters.some(voter => voter === username);
  }

  removeVote(session: ISession, username: string) {
    session.voters = session.voters.filter(voter => voter !== username);
  }

  addVote(session: ISession, username: string) {
    session.voters.push(username);
  }

}
