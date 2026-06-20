import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Journals } from '../../../../fds-config/entity-models/journals';
import { JournalService } from '../../../services/journal-service';
import { Category } from '../../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';
import { CategoriesService } from '../../../services/categories-service';
import { SubcategoryService } from '../../../services/subcategory-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../../../../fds-config/entity-models/user';
import { UserInfoService } from '../../../services/user-info-service';
import { AcademicSubmissionConfig } from '../../../../fds-config/constant/academic-submission-config';

@Component({
  selector: 'app-journal-insert-update',
  standalone: false,
  templateUrl: './journal-insert-update.component.html',
  styleUrl: './journal-insert-update.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalInsertUpdateComponent implements OnInit {

  journalForm!: FormGroup;
  journal: Journals[] = []
  category: Category[] = [];
  subcategory: SubCategory[] = [];

  users: Users[] = [];
  authors: Users[] = [];

  isLoading: boolean = false;
  isEditMode = false;
  journalId!: number;

  constructor(private readonly journalService: JournalService,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubcategoryService,
    private readonly dialogRef: MatDialogRef<JournalInsertUpdateComponent>,
    private readonly userService: UserInfoService,
    @Inject(MAT_DIALOG_DATA) public data: Journals | null,

  ) { }

  ngOnInit(): void {
    this.journalForm = this.journalService.createForm();
    this.getCategory();
    this.getSubCategory();
    this.getUsers();


    if (this.data) {
      this.isEditMode = true;
      this.journalId = this.data.Id;
      this.journalForm.patchValue(this.data);
    }
  }



  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.data as Users[];

      this.authors = this.users.filter(
        (user) => user?.Roles?.Name === AcademicSubmissionConfig.UserRole.Teacher ||
          user?.Roles?.Name === AcademicSubmissionConfig.UserRole.Admin ||
          user?.Roles?.Name === AcademicSubmissionConfig.UserRole.SuperAdmin,
      );
    });
  }

  getCategory() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.category = res?.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getSubCategory() {
    this.subCategoryService.getSubcategories().subscribe({
      next: (res) => {
        this.subcategory = res?.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  save() { }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.journalForm.patchValue({ File: file });
    }
  }

  onFileClear() {
    this.journalForm.patchValue({ File: null });
  }

  onFileRemove(event: any) {
    this.journalForm.patchValue({ File: null });
  }

}
