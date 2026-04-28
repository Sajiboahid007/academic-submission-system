import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ComfirmationDialogComponent } from './comfirmation-dialog/comfirmation-dialog.component';

@NgModule({
  declarations: [ComfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ComfirmationDialogComponent],
})
export class FdsConfigModule {}
