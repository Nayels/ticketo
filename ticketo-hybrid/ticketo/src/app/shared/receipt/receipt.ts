import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sg-receipt',
  templateUrl: 'receipt.html'
})
export class ReceiptComponent {

  id: string;
  @Input() title: string;
  @Input() category: string;
  @Input() image: string;
  @Input() creationDate: Date;
  @Input() total: number;
  @Output() pressed: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  handlePressed() {
    this.pressed.emit();
  }
}
