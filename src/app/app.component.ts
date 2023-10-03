import { Component } from '@angular/core';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddressFormComponent],
  template: `
    <div>
      <app-address-form />
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
