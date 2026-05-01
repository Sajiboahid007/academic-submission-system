import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subcategory-list',
  standalone: false,
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubcategoryListComponent implements OnInit {
  @ViewChild('subCategoryModal') subCategoryModal!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openAddModal(): void {
    this.dialogRef = this.dialog.open(this.subCategoryModal, {
      width: '600px',
      disableClose: false,
      autoFocus: false
    });
  }

  closeModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

