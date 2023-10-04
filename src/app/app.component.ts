import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, AddressFormComponent, PersonFormComponent, FormsModule],
  template: `
    <h2>2-way component binding form submit</h2>
    <form (ngSubmit)="submitTypedForm($event)">
      <app-person-form 
        [(firstName)]="userForm.firstName" 
        [(lastName)]="userForm.lastName" 
        (isFormValid)="isPersonFormValid = $event"
      />
      <app-address-form />
      <button type="submit" [disabled]="true">Submit</button>
    </form>
    <p>Reactive Form:</p>
    <pre>
      {{ userForm | json }}
      {{ isPersonFormValid | json }}
    </pre>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  userForm = {
    firstName: '',
    lastName: '',
  };

  isPersonFormValid = false;
  
  submitTypedForm(event: Event) {
    console.log('event', event.target);
    // event.preventDefault();
    // alert(JSON.stringify(this.myForm.value));
    console.log('submitTypedForm called');
  }
}
