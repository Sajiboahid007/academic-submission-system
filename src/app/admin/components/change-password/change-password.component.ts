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
import { UserInfoService } from '../../services/user-info-service';

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
    private readonly userService: UserInfoService,
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

    const { currentPassword, newPassword } = this.form.value;

    this.userService.changePassword({ currentPassword, newPassword }).subscribe({
      next: (res) => {
        this.toast.success('Password updated successfully!', 'Change password');
        this.form.reset();
      },
      error: (err) => {
        console.error('Error changing password:', err);
        const errorMsg = err?.error?.message || err?.error?.error || 'Failed to update password. Please check your current password.';
        this.toast.error(errorMsg, 'Change password');
      },
    });
  }
}
