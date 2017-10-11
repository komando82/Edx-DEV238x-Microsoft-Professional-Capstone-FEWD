import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contact-modal',
  styleUrls: ['./contact-modal.component.scss'],
  templateUrl: './contact-modal.component.html'
})
export class ContactModalComponent {

  @Input() public name: string;
  @Input() public email: string;
  @Input() public subject: string;
  @Input() public message: string;

  @Input() public openModal: boolean;

  @Output() public onCloseModal = new EventEmitter();

  constructor() {}

  public closeModalClick(event) {
    event.stopPropagation();
    this.onCloseModal.emit(true);
  }

  public doNothing(event) {
    event.stopPropagation();
  }

}
