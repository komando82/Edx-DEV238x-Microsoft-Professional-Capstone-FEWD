import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contact',
  styleUrls: ['./contact.component.css'],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  public form: FormGroup;

  public name: string;
  public email: string;
  public subject: string;
  public message: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    let EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/i;

    this.form = fb.group({
      nameControl: ['', Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      emailControl: ['', Validators.compose(
        [Validators.required, Validators.minLength(6), Validators.pattern(EMAIL_REGEXP)]
      )],
      subjectControl: ['', Validators.compose(
        [Validators.required]
      )],
      messageControl: ['', Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )],
    });
  }

  public onSubmitFormClick(event) {
    if (this.validation()) {

      console.log('click');
      
      console.log(this.name);
      console.log(this.email);
      console.log(this.subject);
      console.log(this.message);

      this.form.reset();
    }
  }

  private validation() {
    if (!this.name || this.name === '') {
        return false;
    }
    if (!this.email || this.email === '') {
        return false;
    }
    if (!this.validateEmail(this.email)) {
        return false;
    }
    if (!this.subject || this.subject === '') {
        return false;
    }
    if (!this.message || this.message === '') {
        return false;
    }

    return true;
  }
    
  private validateEmail (email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(email);
  }
  

}
