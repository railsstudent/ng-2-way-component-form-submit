import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <h3>Address Form</h3>
    <form #addressForm="ngForm">
      <div>
        <label for="street1">
          <span>Street 1: </span>
          <input id="street1" name="street1" required
            [ngModel]="streetOne"
            (ngModelChange)="emitValue($event, 'streetOne', addressForm.valid)"
            #streetOneControl="ngModel"
          />
        </label>
        <span class="error" *ngIf="streetOneControl.errors?.['required'] && streetOneControl.dirty">
          Street 1 is required
        </span>
      </div>
      <div>
        <label for="street2">
          <span>Street 2: </span>
          <input id="street2" name="street2" required 
            [ngModel]="streetTwo"
            (ngModelChange)="emitValue($event, 'streetTwo', addressForm.valid)"
            #streetTwoControl="ngModel"
          />
        </label>
        <span class="error" *ngIf="streetTwoControl.errors?.['required'] && streetTwoControl.dirty">
          Street 2 is required
        </span>
      </div>
      <div>
        <label for="city">
          <span>City: </span>
          <input id="city" name="city" 
            [ngModel]="city"
            (ngModelChange)="emitValue($event, 'city', addressForm.valid)"
            #cityControl="ngModel"
          />
        </label>
        <span class="error" *ngIf="cityControl.errors?.['required'] && cityControl.dirty">
          City is required
        </span>
      </div>
      <div>
        <label for="country">
          <span>Country: </span>
          <input id="country" name="country" 
            [ngModel]="country"
            (ngModelChange)="emitValue($event, 'country', addressForm.valid)"
            #countryControl="ngModel"
          />
        </label>
        <span class="error" *ngIf="countryControl.errors?.['required'] && countryControl.dirty">
          Country is required
        </span>
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

  @Output()
  isAddressFormValid = new EventEmitter<boolean>();

  emitValue(value: string, key: string, isValid: boolean | null) {
    if (key === 'streetOne') {
      this.streetOneChange.emit(value);
    } else if (key === 'streetTwo') {
      this.streetTwoChange.emit(value);
    } else if (key === 'city') {
      this.cityChange.emit(value);
    } else if (key === 'country') {
      this.countryChange.emit(value);
    }

    const isFormValid = isValid === null ? false : isValid;
    this.isAddressFormValid.emit(isFormValid);
  }
}
