import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'warn' | 'accent';
}

@Component({
  selector: 'app-comfirmation-dialog',
  standalone: false,
  templateUrl: './comfirmation-dialog.component.html',
  styleUrl: './comfirmation-dialog.component.scss',
})
export class ComfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ComfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
    this.data.title = this.data.title ?? 'Confirm Delete';
    this.data.message = this.data.message ?? 'Are you sure you want to delete this item?';
    this.data.confirmText = this.data.confirmText ?? 'Delete';
    this.data.cancelText = this.data.cancelText ?? 'Cancel';
    this.data.confirmColor = this.data.confirmColor ?? 'warn';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
