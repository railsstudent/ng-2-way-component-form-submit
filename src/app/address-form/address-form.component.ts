import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>Address Form</h3>
    <form #addressForm="ngForm">
      <div>
        <label for="street1">
          <span>Street 1: </span>
          <input id="street1" name="street1"
            [ngModel]="streetOne"
            (ngModelChange)="updateField($event, 'streetOne', addressForm.valid)"
          />
        </label>
      </div>
      <div>
        <label for="street2">
          <span>Street 2: </span>
          <input id="street2" name="street2" />
        </label>
      </div>
      <div>
        <label for="city">
          <span>City: </span>
          <input id="city" name="city" />
        </label>
      </div>
      <div>
        <label for="country">
          <span>Country: </span>
          <input id="country" name="country" />
        </label>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
    }

    h3 {
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent {
  @Input()
  streetOne = '';

  @Output()
  streetOneChange = new EventEmitter<string>();

  @Input()
  streetTwo = '';

  @Output()
  streetTwoChange = new EventEmitter<string>();

  @Input()
  city = '';

  @Output()
  cityChange = new EventEmitter<string>();

  @Input()
  country = '';

  @Output()
  countryChange = new EventEmitter<string>();

  isAddressFormValid = new EventEmitter<boolean>();

  updateField(value: string, fieldName: string, isValid: boolean | null) {
    if (fieldName === 'streetOne') {
      this.streetOneChange.emit(value);
    }

    const isFormValid = isValid === null ? false : isValid;
    this.isAddressFormValid.emit(isFormValid);
  }
}
