import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the CounterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'counter',
  templateUrl: 'counter.html'
})
export class CounterComponent {

  @Input() default: number = 5;
  @Input() max: number = 100;
  @Input() min: number = 1;
  @Output() output: EventEmitter<number> = new EventEmitter<number>();
  private num: number = this.default;

  constructor() {
    console.log('Hello CounterComponent Component');
  }

  ngOnInit() {
    this.num = this.default;
    this.output.emit(this.num);
  }

  operNum(symbol: number) {
    if (symbol < 0) {
      if (this.num > this.min) {
        this.num--;
      }
    } else if (symbol > 0) {
      if (this.num < this.max) {
        this.num++;
      }
    }
    this.output.emit(this.num);
  }
}
