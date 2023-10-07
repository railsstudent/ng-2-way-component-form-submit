import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { UserForm } from './interfaces/user-form.interface';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [FormFieldComponent],
  template: `
    <h3>Person Form</h3>
    <div class="form">
      <app-form-field key='firstName' label="First name: " [errors]="errors['firstName']" [form]="form" />
      <app-form-field key='lastName' label="Last name: " [errors]="errors['lastName']" [form]="form" />
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

  errors = {
    firstName: [{ key: 'required', message: 'First name is required' }],
    lastName: [{ key: 'required', message: 'Last name is required' }]
  };

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
