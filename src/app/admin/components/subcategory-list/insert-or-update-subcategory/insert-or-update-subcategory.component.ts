import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../fds-config/entity-models/categories';
import { CategoriesService } from '../../../services/categories-service';

@Component({
  selector: 'app-insert-or-update-subcategory',
  standalone: false,
  templateUrl: './insert-or-update-subcategory.component.html',
  styleUrl: './insert-or-update-subcategory.component.scss'
})
export class InsertOrUpdateSubcategoryComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  subcategoryForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm(): void {
    this.subcategoryForm = this.fb.group({
      CategoryId: [null, Validators.required],
      Name: ['', Validators.required],
      Code: ['', Validators.required],
      Status: [true]
    });
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data || [];
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onSave(): void {
    if (this.subcategoryForm.valid) {
      console.log('Form data to save:', this.subcategoryForm.value);
      // Call your subcategory saving service here
      this.closeDialog.emit();
    }
  }

  onCancel(): void {
    this.closeDialog.emit();
  }
}
