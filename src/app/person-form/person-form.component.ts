import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <h3>Person Form</h3>
    <form #personForm="ngForm">
      <div>
        <label for="firstName">
          <span>First name: </span>
          <input id="firstName" name="firstName"
            [ngModel]="firstName"
            (ngModelChange)="emitValue($event, 'firstName', personForm.valid)" required
            #firstNameControl="ngModel"
           />
          <span class="error" *ngIf="firstNameControl.errors?.['required'] && firstNameControl.dirty">
            First name is required
          </span>
        </label>
      </div>
      <div>
        <label for="lastName">
          <span>Last name: </span>
          <input id="lastName" name="lastName"
            [ngModel]="lastName" 
            (ngModelChange)="emitValue($event, 'lastName', personForm.valid)" required
            #lastNameControl="ngModel"
          />
          <span class="error" *ngIf="lastNameControl.errors?.['required'] && lastNameControl.dirty">
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
  firstName = '';

  @Output()
  firstNameChange = new EventEmitter<string>();
  
  @Input()
  lastName = '';

  @Output()
  lastNameChange = new EventEmitter<string>();
  
  @Output()
  isPersonFormValid = new EventEmitter<boolean>();

  emitValue(value: string, key: string, isValid: boolean | null) {
    if (key === 'firstName') {
      this.firstNameChange.emit(value);
    } else if (key === 'lastName') {
      this.lastNameChange.emit(value);
    }

    const isFormValid = isValid === null ? false : isValid;
    this.isPersonFormValid.emit(isFormValid);
  }
}
