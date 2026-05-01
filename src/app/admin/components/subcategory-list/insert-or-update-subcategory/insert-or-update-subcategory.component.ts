import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from '../../../../fds-config/entity-models/categories';
import { CategoriesService } from '../../../services/categories-service';
import { SubcategoryService } from '../../../services/subcategory-service';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';

@Component({
  selector: 'app-insert-or-update-subcategory',
  standalone: false,
  templateUrl: './insert-or-update-subcategory.component.html',
  styleUrl: './insert-or-update-subcategory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsertOrUpdateSubcategoryComponent implements OnInit {

  // input variables
  @Input() subCategoryId = 0;
  @Input() isEditMode = false;

  // output variables
  @Output() closeDialog = new EventEmitter<void>();

  // Form and data variables
  subcategoryForm!: FormGroup;
  categories: Category[] = [];



  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly subcategoryService: SubcategoryService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
  }

  initForm(): void {
    // Initialize form synchronously so template has it available immediately
    this.subcategoryForm = this.subcategoryService.createSubCategoryForm();

    if (this.isEditMode) {
      this.getSubCategoryById(this.subCategoryId);
    } else {
      this.subcategoryForm.markAllAsTouched();
      this.subcategoryForm.updateValueAndValidity();
    }
  }

  private getSubCategoryById(id: number): void {
    this.subcategoryService.getSubcategoryById(id).subscribe({
      next: (res: any) => {
        this.subcategoryForm = this.subcategoryService.createSubCategoryForm(res.data);
        this.subcategoryForm.markAllAsTouched();
        this.subcategoryForm.updateValueAndValidity();
        this.cd.detectChanges();
      },
      error: (error: any) => {
        this.onCancel();
        console.error('Error fetching subcategory:', error);
      }
    });
  }

  private getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data || [];
        this.cd.detectChanges();
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onSave(): void {
    if (this.subcategoryForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.updateSubCategory();
    } else {
      this.saveSubCategory();
    }
  }

  public onCancel(): void {
    this.closeDialog.emit();
  }

  private saveSubCategory(): void {
    const subCategory = this.subcategoryForm.getRawValue() as SubCategory;
    this.subcategoryService.addSubcategory(subCategory).subscribe({
      next: (res: any) => {
        this.closeDialog.emit();
      },
      error: (error: any) => {
        console.error('Error saving subcategory:', error);
      }
    });
  }

  private updateSubCategory(): void {
    const subCategory = this.subcategoryForm.getRawValue() as SubCategory;
    // setting the id of the subcategory
    subCategory.Id = this.subCategoryId;

    this.subcategoryService.updateSubcategory(subCategory).subscribe({
      next: (res: any) => {
        this.closeDialog.emit();
      },
      error: (error: any) => {
        console.error('Error updating subcategory:', error);
      }
    });
  }
}
