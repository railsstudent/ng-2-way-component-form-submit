import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressForm } from './address-form/interfaces/address-form.interface';
import { UserForm } from './person-form/interfaces/user-form.interface';
import { PersonFormComponent } from './person-form/person-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, AddressFormComponent, PersonFormComponent, FormsModule],
  template: `
    <h2>2-way data binding to build complex form</h2>
    <form (ngSubmit)="handleSubmit()">
      <app-person-form 
        [(userForm)]="userForm" 
        (isPersonFormValid)="isChildPersonFormValid = $event"
      />
      <app-address-form
        [(addressForm)]="addressForm" 
        (isAddressFormValid)="isChildAddressFormValid = $event"
      />
      <button type="submit" [disabled]="!isChildPersonFormValid || !isChildAddressFormValid">
        Submit
      </button>
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
  userForm: UserForm = {
    firstName: '',
    lastName: '',
  };

  addressForm: AddressForm = {
    streetOne: '',
    streetTwo: '',
    city: '',
    country: '',
  };

  isChildPersonFormValid = false;
  isChildAddressFormValid = false;

  constructor(titleService: Title) {
    titleService.setTitle('2-way data binding to build complex form');
  }
  
  handleSubmit() {
    const submittedData = {
      ...this.userForm,
      ...this.addressForm,
    }

    alert(JSON.stringify(submittedData));
    console.log('handleSubmit called');
  }
}
