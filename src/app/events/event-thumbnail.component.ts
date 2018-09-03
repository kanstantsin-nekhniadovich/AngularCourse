import { Component, Input } from '@angular/core';

@Component({
  selector: 'event-thumbnail',
  templateUrl: 'event-thumbnail.component.html',
  styles: [`
     .thumbnail {min-height: 210px;}
    .pad-left {margin-left: 10px;}
  `]
})
export class EventThumbnailComponent {
  @Input() event: any;
}
