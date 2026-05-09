import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';

const confirmMatchesNew: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const next = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (confirm == null || confirm === '') {
    return null;
  }
  return next === confirm ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: ToastService,
  ) {
    this.form = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: confirmMatchesNew },
    );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.toast.info(
      'Password change is not connected to the server yet. This form validates your input only.',
      'Change password',
    );
    this.form.reset();
  }
}
