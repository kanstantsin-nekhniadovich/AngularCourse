import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { AuthService } from '../../user/auth.service';
import { VotedService } from '../voted.service';
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';
import { UpvoteComponent } from '../event-details/upvote.component';
import { DurationPipe } from '../../shared/duration.pipe';

describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement

  beforeEach(async(() => {
    let mockAuthService = { isAuthenticated: () => true, currentUser: { userName: 'john' } };
    let mockVoterService = {
      userHasVoted: () => true
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        CollapsibleWellComponent,
        UpvoteComponent,
        DurationPipe
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VotedService, useValue: mockVoterService }
      ],
      schemas: [
        // NO_ERRORS_SCHEMA - to skip all erros, if angular see unrecognized component/HtmlElement
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {
    it('should have the correct session title', () => {
      component.sessions = [{ id: 3, name: 'Session 1', presenter: "Joe", duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob'] }];
      component.filteredBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
    });
  })

})