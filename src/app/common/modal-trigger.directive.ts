import { Directive, OnInit, Inject, ElementRef, OnDestroy } from '@angular/core';
import { JQ_TOKEN } from './jquery.service';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit, OnDestroy {
  private el: HTMLElement;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    this.el.addEventListener('click', e => {
      this.$('#simple-modal').modal({});
    });
  }

  ngOnDestroy() {
    this.el.removeEventListener('click', e => {
      this.$('#simple-modal').modal({});
    })
  }

}
