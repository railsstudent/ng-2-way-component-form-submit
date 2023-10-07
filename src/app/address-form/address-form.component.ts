import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { AddressForm } from './interfaces/address-form.interface';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [FormFieldComponent, NgFor, ReactiveFormsModule],
  template: `
    <h3>Address Form</h3>
    <div class="form" [formGroup]="form">
      <app-form-field *ngFor="let key of keys" [key]="key" [label]="configs[key].label" [errors]="configs[key].errors" />
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

  configs: Record<string, any> = {
    streetOne: {
      label: "Street 1: ",
      errors: [{ key: 'required', message: 'Street 1 is required' }],
    },
    streetTwo: {
      label: "Street 2: ",
      errors: [{ key: 'required', message: 'Street 2 is required' }],
    },
    city: {
      label: "City: ",
      errors: [{ key: 'required', message: 'City is required' }],
    },
    country: {
      label: "Country: ",
      errors: [{ key: 'required', message: 'Country is required' }],
    }
  }

  keys = Object.keys(this.configs);

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
