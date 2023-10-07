import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { UserForm } from './interfaces/user-form.interface';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [FormFieldComponent, NgFor, ReactiveFormsModule],
  template: `
    <h3>Person Form</h3>
    <div class="form" [formGroup]="form">
      <app-form-field *ngFor="let key of keys" [key]="key" [label]="configs[key].label" [errors]="configs[key].errors" />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent {  
  @Input()
  userForm!: UserForm;

  @Output()
  userFormChange = new EventEmitter<UserForm>();

  @Output()
  isPersonFormValid = new EventEmitter<boolean>();

  form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  })

  configs: Record<string, any> = {
    firstName: {
      label: "First Name: ",
      errors: [{ key: 'required', message: 'First name is required' }],
    },
    lastName: {
      label: "Last Name: ",
      errors: [{ key: 'required', message: 'Last name is required' }],
    },
  }

  keys = Object.keys(this.configs);

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((values) => {
        this.userForm = {
          firstName: values.firstName || '',
          lastName: values.lastName || '',
        };
        this.userFormChange.emit(this.userForm);
        this.isPersonFormValid.emit(this.form.valid);
      });
  }
}
