import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressForm } from './interfaces/address-form.interface';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <h3>Address Form</h3>
    <form [formGroup]="form">
      <div>
        <label for="streetOne">
          <span>Street 1: </span>
          <input id="streetOne" name="streetOne" required formControlName="streetOne" />
        </label>
        <span class="error" *ngIf="form.controls.streetOne.errors?.['required'] && form.controls.streetOne.dirty">
          Street 1 is required
        </span>
      </div>
      <div>
        <label for="streetTwo">
          <span>Street 2: </span>
          <input id="streetTwo" name="streetTwo" required formControlName="streetTwo" />
        </label>
        <span class="error" *ngIf="form.controls.streetTwo.errors?.['required'] && form.controls.streetTwo.dirty">
          Street 2 is required
        </span>
      </div>
      <div>
        <label for="city">
          <span>City: </span>
          <input id="city" name="city" required formControlName="city" />
        </label>
        <span class="error" *ngIf="form.controls.city.errors?.['required'] && form.controls.city.dirty">
          City is required
        </span>
      </div>
      <div>
        <label for="country">
          <span>Country: </span>
          <input id="country" name="country" required formControlName="country" />
        </label>
        <span class="error" *ngIf="form.controls.country.errors?.['required'] && form.controls.country.dirty">
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
  addressForm!: AddressForm;

  @Output()
  addressFormChange = new EventEmitter<AddressForm>();

  @Output()
  isAddressFormValid = new EventEmitter<boolean>();

  form = new FormGroup({
    streetOne: new FormControl('', { nonNullable: true }),
    streetTwo: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    country: new FormControl('', { nonNullable: true }),
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
