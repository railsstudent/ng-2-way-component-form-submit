import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { PersonFormComponent } from './person-form/person-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, AddressFormComponent, PersonFormComponent, FormsModule],
  template: `
    <h2>2-way binding to build complex form</h2>
    <form (ngSubmit)="handleSubmit()">
      <app-person-form 
        [(firstName)]="userForm.firstName" 
        [(lastName)]="userForm.lastName" 
        (isPersonFormValid)="isChildPersonFormValid = $event"
      />
      <app-address-form
        [(streetOne)]="addressForm.streetOne" 
        [(streetTwo)]="addressForm.streetTwo"
        [(city)]="addressForm.city"
        [(country)]="addressForm.country" 
        (isAddressFormValid)="isChildAddressFormValid = $event"
      />
      <button type="submit" [disabled]="!isChildPersonFormValid || !isChildAddressFormValid">Submit</button>
    </form>
    <p>User Form:</p>
    <pre>
      {{ userForm | json }}
    </pre>
    <p>Address Form:</p>
    <pre>
      {{ addressForm | json }}
    </pre>
  `,
  styles: [`
    :host {
      display: block;
    }

    button {
      padding: 0.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  userForm = {
    firstName: '',
    lastName: '',
  };

  addressForm = {
    streetOne: '',
    streetTwo: '',
    city: '',
    country: '',
  };

  isChildPersonFormValid = false;
  isChildAddressFormValid = false;
  
  handleSubmit() {
    const submittedData = {
      ...this.userForm,
      ...this.addressForm,
    }

    alert(JSON.stringify(submittedData));
    console.log('handleSubmit called');
  }
}
