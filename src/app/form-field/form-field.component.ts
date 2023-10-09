import { NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { Config } from './interfaces/config.interface';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  template: `
    <div [formGroup]="form">
      <label for="{{ key }}">
        <span>{{ config['label'] || 'Label' }}</span>
        <input [id]="key" [name]="key" [formControlName]="key" />
        <ng-container *ngFor="let error of config['errors'] || []">
          <span class="error" *ngIf="form.controls[key]?.errors?.[error.key] && form.controls[key]?.dirty">
            {{ error.message }}
          </span>
        </ng-container>
      </label>
    </div>
  `,
  styles: [`
    input {
      padding: 0.25rem;
      width: 300px;
    }

    .error {
      color: red;
    }
  `],
})
export class FormFieldComponent {
  form = inject(FormGroupDirective).form;

  @Input({ required: true })
  key!: string;

  @Input({ required: true })
  config!: Config;
}
