import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubcategoryService } from '../../../services/subcategory-service';
import { CategoriesService } from '../../../services/categories-service';
import { Category } from '../../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';

@Component({
  selector: 'app-subcategory-insert-update',
  standalone: false,
  templateUrl: './subcategory-insert-update.component.html',
  styleUrl: './subcategory-insert-update.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryInsertUpdateComponent implements OnInit {


  categories: Category[] = [];
  isEditMode: boolean = false;
  subcategoryForm!: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<SubcategoryInsertUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubCategory,
    private readonly subcatService: SubcategoryService,
    private readonly categoriesService: CategoriesService
  ) {
    if (this.data) {
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
    this.subcategoryForm = new FormGroup({
      Id: new FormControl(this.data?.Id || 0),
      Name: new FormControl(this.data?.Name || '', [Validators.required, Validators.minLength(3)]),
      CategoryId: new FormControl(this.data?.CategoryId || null, [Validators.required]),
      Code: new FormControl(this.data?.Code || ''),
    });
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  onSave() {
    if (this.subcategoryForm.valid) {
      const subcatData = this.subcategoryForm.getRawValue();
      if (this.isEditMode) {
        this.subcatService.updateSubcategory(subcatData).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error updating subcategory:', error);
          },
        });
      } else {
        this.subcatService.addSubcategory(subcatData).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error adding subcategory:', error);
          },
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  saveSubcat() {
    this.subcatService.addSubcategory(this.subcategoryForm.getRawValue()).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error adding subcategory:', error);
      },
    });
  }
}
