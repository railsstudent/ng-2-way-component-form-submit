import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { AddressForm } from './interfaces/address-form.interface';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [FormFieldComponent],
  template: `
    <h3>Address Form</h3>
    <div class="form">
      <app-form-field key='streetOne' label="Street 1: " [errors]="errors['streetOne']" [form]="form" />
      <app-form-field key='streetTwo' label="Street 2: " [errors]="errors['streetTwo']" [form]="form" />
      <app-form-field key='city' label="City: " [errors]="errors['city']" [form]="form" />
      <app-form-field key='country' label="Country: " [errors]="errors['country']" [form]="form" />
    </div>
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
  addressForm!: AddressForm;

  @Output()
  addressFormChange = new EventEmitter<AddressForm>();

  @Output()
  isAddressFormValid = new EventEmitter<boolean>();

  errors = {
    streetOne: [{ key: 'required', message: 'Street 1 is required' }],
    streetTwo: [{ key: 'required', message: 'Street 2 is required' }],
    city: [{ key: 'required', message: 'city is required' }],
    country: [{ key: 'required', message: 'country is required' }]
  };

  form = new FormGroup({
    streetOne: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    streetTwo: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((values) => {
        this.addressForm = {
          streetOne: values.streetOne || '',
          streetTwo: values.streetTwo || '',
          city: values.city || '',
          country: values.country || '',
        };
        this.addressFormChange.emit(this.addressForm);
        this.isAddressFormValid.emit(this.form.valid);
      });
  }
}
