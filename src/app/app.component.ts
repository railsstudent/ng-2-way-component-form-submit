import { Component } from '@angular/core';
import { AddressFormComponent } from './address-form/address-form.component';
import { PersonFormComponent } from './person-form/person-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddressFormComponent, PersonFormComponent],
  template: `
    <div>
      <app-address-form />
      <app-person-form />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'ng-component-2-way-binding-form-submit';
}
