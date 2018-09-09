import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISession, restrictedWords } from '../../shared';

@Component({
  selector: 'create-session',
  templateUrl: 'create-session.template.html',
  styles: [`
  em {float: right; color: #E05C65; padding-left: 10px;}
  .error input {background-color: #E3C3C5}
  .error textarea {background-color: #E3C3C5}
  .error ::-webkit-input-placeholder {color: #999}
  .error ::-moz-input-placeholder {color: #999}
  .error ::ms-input-placeholder {color: #999}
  .error :-moz-input-placeholder {color: #999}
  `]
})
export class CreateSessionComponent implements OnInit {
  session: ISession;
  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddNewSession = new EventEmitter();
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);
    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  submit(session) {
    this.session = {
      id: undefined,
      name: session.name,
      presenter: session.presenter,
      level: session.level,
      duration: +session.duration,
      abstract: session.abstract,
      voters: []
    }
    this.saveNewSession.emit(this.session);
  }

  cancel() {
    this.cancelAddNewSession.emit();
  }
}