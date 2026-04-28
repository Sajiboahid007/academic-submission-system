import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subcategory-insert-update',
  standalone: false,
  templateUrl: './subcategory-insert-update.component.html',
  styleUrl: './subcategory-insert-update.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryInsertUpdateComponent implements OnInit {
  ngOnInit(): void {
    this.subcategoryForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Status: new FormControl(false),
      Image: new FormControl(''),
    });
  }
  isEditMode: boolean = false;
  subcategoryForm!: FormGroup;
}
