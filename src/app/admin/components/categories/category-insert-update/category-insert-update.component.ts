import { Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../../fds-config/entity-models/categories';
import { AppQuery } from '../../../../shared/app-query';
import { FileService } from '../../../../shared/services/file-service';
import { CategoriesService } from '../../../services/categories-service';

@Component({
  selector: 'app-category-insert-update',
  standalone: false,
  templateUrl: './category-insert-update.component.html',
  styleUrl: './category-insert-update.component.scss',
})
export class CategoryInsertUpdateComponent implements OnInit {
  isEditMode = false;
  categoryId!: number;

  categoryForm!: FormGroup;

  category: Category[] = [];
  dataSource = new MatTableDataSource<Category>([]);

  constructor(
    private readonly dialogRef: MatDialogRef<CategoryInsertUpdateComponent>,
    private readonly categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Category | null,
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Code: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    if (this.data) {
      this.isEditMode = true;
      this.categoryId = this.data.Id;
      this.categoryForm.patchValue(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categoryForm.invalid) return;

    if (this.isEditMode) {
      this.updateCategory();
    } else {
      this.saveCategory();
    }
  }

  updateCategory(): void {
    const payload: Category = {
      Id: this.categoryId,
      Name: this.categoryForm.get('Name')?.value,
      Code: this.categoryForm.get('Code')?.value,
      IsMarkToDelete: false,
      CreatedAt: new Date(),
    };

    this.categoriesService.update(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => console.error('Error updating category:', error),
    });
  }

  saveCategory(): void {
    const payload: Category = this.categoryForm.getRawValue();
    console.log('Payload to save:', payload);
    this.categoriesService.addCategory(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => console.error('Error adding category:', error),
    });
  }

  // onUpload(event: any): void {
  //   const file = event.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64String = reader.result as string;
  //       this.categoryForm.get('ImageUrl')?.setValue(base64String);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.selectedFile = null as any;
  //   }
  // }
}
