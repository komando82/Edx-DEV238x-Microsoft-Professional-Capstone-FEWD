import { Component, Renderer2 } from '@angular/core';

import { ContactFormComponent } from './contact-form';
import { ContactModalComponent } from './contact-modal';

@Component({
  selector: 'contact',
  styleUrls: ['./contact.component.css'],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  public name: string = '';
  public email: string = '';
  public subject: string = '';
  public message: string = '';

  public openModal: boolean = false;
  public resetForm: boolean = false;

  constructor(private renderer: Renderer2) {}

  public onSubmitForm(emitData) {
    this.openModal = true;

    this.name = emitData.name;
    this.email = emitData.email;
    this.subject = emitData.subject;
    this.message = emitData.message;

    this.renderer.addClass(document.body, 'modal-open');
  }

  public onCloseModal(emitData) {
    this.resetForm = emitData;
    this.openModal = false;

    this.renderer.removeClass(document.body, 'modal-open');
  }

}
