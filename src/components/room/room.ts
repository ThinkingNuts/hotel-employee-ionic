import { Component, Input, Output } from '@angular/core';

/**
 * Generated class for the RoomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'room',
  templateUrl: 'room.html'
})
export class RoomComponent {

  @Input() finished: boolean = false;
  @Output() checked: boolean = false;

  constructor() {
    console.log('Hello RoomComponent Component');
  }

}
