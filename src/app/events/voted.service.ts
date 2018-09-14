import { Injectable } from '@angular/core';
import { ISession } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class VotedService {

  constructor(private http: HttpClient) { }

  userHasVoted(session: ISession, username: string) {
    return session.voters.some(voter => voter === username);
  }

  removeVote(eventId: number, session: ISession, username: string) {
    session.voters = session.voters.filter(voter => voter !== username);
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${username}`;
    this.http.delete(url)
      .pipe(catchError(this.handleError('removeVote')))
      .subscribe();
  }

  addVote(eventId: number, session: ISession, username: string) {
    session.voters.push(username);
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${username}`;
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVote')))
      .subscribe();
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
