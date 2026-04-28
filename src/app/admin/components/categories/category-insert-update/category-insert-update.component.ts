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
  selectedFile!: File;

  categoryForm!: FormGroup;

  category: Category[] = [];
  dataSource = new MatTableDataSource<Category>([]);

  constructor(
    private readonly dialogRef: MatDialogRef<CategoryInsertUpdateComponent>,
    private readonly categoriesService: CategoriesService,
    private readonly fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: Category | null,
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Status: new FormControl(false),
      Image: new FormControl(''),
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
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (res: AppQuery<{ ImageUrl: string }>) => {
          if (this.isEditMode) {
            this.updateCategory(res.data.ImageUrl);
          } else {
            this.saveCategory(res.data.ImageUrl);
          }
        },
        error: (error: any) => {
          console.error('Error uploading file:', error);
        },
      });
    } else {
      if (this.isEditMode) {
        this.updateCategory(this.data?.ImageUrl || '');
      } else {
        this.saveCategory('');
      }
    }
  }

  updateCategory(imageUrl: string): void {
    const payload: Category = {
      Id: this.categoryId,
      Name: this.categoryForm.get('Name')?.value,
      Status: this.categoryForm.get('Status')?.value,
      ImageUrl: imageUrl,
    };

    this.categoriesService.upodate(payload).subscribe({
      next: (res: AppQuery<Category>) => {
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        console.error('Error updating category:', error);
      },
    });
  }

  saveCategory(imageUrl: string): void {
    let payload: Category = this.categoryForm.getRawValue();
    payload.ImageUrl = imageUrl || '';

    this.categoriesService.addCategory(payload).subscribe({
      next: (res: AppQuery<Category>) => {
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        console.error('Error adding category:', error);
      },
    });
  }

  onUpload(event: any): void {
    const file = event.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.categoryForm.get('ImageUrl')?.setValue(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null as any;
    }
  }
}
