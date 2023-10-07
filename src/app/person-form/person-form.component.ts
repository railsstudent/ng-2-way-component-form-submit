import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserForm } from './interfaces/user-form.interface';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  template: `
    <h3>Person Form</h3>
    <form [formGroup]="form">
      <div>
        <label for="firstName">
          <span>First name: </span>
          <input id="firstName" name="firstName" formControlName="firstName" />
          <span class="error" *ngIf="form.controls.firstName.errors?.['required'] && form.controls.firstName.dirty">
            First name is required
          </span>
        </label>
      </div>
      <div>
        <label for="lastName">
          <span>Last name: </span>
          <input id="lastName" name="lastName" formControlName="lastName" />
          <span class="error" *ngIf="form.controls.lastName.errors?.['required'] && form.controls.lastName.dirty">
            Last name is required
          </span>
        </label>
      </div>
    </form>
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
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
  })

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
