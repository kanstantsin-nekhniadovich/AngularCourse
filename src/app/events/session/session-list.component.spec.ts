import { SessionListComponent } from './session-list.component';
import { ISession } from '../../shared';

describe('SessionListComponent', () => {
  let authService, votedService;
  let component: SessionListComponent;

  beforeEach(() => {
    component = new SessionListComponent(authService, votedService);
  });

  describe('ngOnChanges', () => {
    it('should sort the sessions correctly', () => {
      component.sessions = <ISession[]>[
        { name: 'session 2', level: 'beginner' },
        { name: 'session 3', level: 'intermediate' },
        { name: 'session 1', level: 'intermediate' }];

      component.filteredBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();
      expect(component.visibleSessions[2].name).toBe('session 3');
    });
  });
});
