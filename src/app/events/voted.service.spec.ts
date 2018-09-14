import { ISession } from '../shared';
import { Observable, of } from 'rxjs';
import { VotedService } from './voted.service';

describe('VotedService', () => {
  let votedService: VotedService;
  let http;

  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['delete', 'post']);
    votedService = new VotedService(http);
  });

  describe('deleteVoter', () => {
    it('should remove voter from list of voters', () => {
      var session = { id: 1, voters: ['joe', 'kostya'] };
      http.delete.and.returnValue(of(false));

      votedService.removeVote(3, <ISession>session, 'joe');
      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('kostya');
    });

    it('should call http.delete with right url', () => {
      var session = { id: 1, voters: ['joe', 'kostya'] };
      http.delete.and.returnValue(of(false));

      votedService.removeVote(3, <ISession>session, 'joe');
      let url = `/api/events/3/sessions/1/voters/joe`;
      expect(http.delete).toHaveBeenCalledWith(url);
    });
  });

  describe('addVoter', () => {
    it('should call http.post with right url', () => {
      var session = { id: 1, voters: ['kostya'] };
      http.post.and.returnValue(of(false));

      votedService.addVote(3, <ISession>session, 'joe');
      let url = `/api/events/3/sessions/1/voters/joe`;
      expect(http.post).toHaveBeenCalledWith(url, {}, jasmine.any(Object));
    });
  });
})
