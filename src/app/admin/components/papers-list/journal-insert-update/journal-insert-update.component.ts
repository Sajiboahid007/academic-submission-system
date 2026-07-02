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
import { FileService } from '../../../services/file-service';
import { ToastService } from '../../../../shared/services/toast.service';

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
  isSaving: boolean = false;
  journalId!: number;

  constructor(private readonly journalService: JournalService,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubcategoryService,
    private readonly dialogRef: MatDialogRef<JournalInsertUpdateComponent>,
    private readonly userService: UserInfoService,
    private readonly fileService: FileService,
    private readonly toastService: ToastService,
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

  save() {
    if (this.journalForm.invalid) {
      this.journalForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    if (this.isEditMode) {
      this.updateJournal();
    } else {
      this.onSave();
    }
  }

  onSave() {
    const file = this.journalForm.value.File;

    if (file) {
      this.fileService.uploadFile(file).subscribe({
        next: (res) => {
          this.isSaving = false;
          const journal = this.journalForm.getRawValue() as Journals;
          journal.FileUrl = res?.data?.url;
          this.savePaper(journal);
        },
        error: (err) => {
          console.log(err);
          this.isSaving = false;
          this.toastService.error('Error creating journal');
        },
      });
    } else {
      this.isSaving = false;
      const journal = this.journalForm.getRawValue() as Journals;
      this.savePaper(journal);
    }
  }

  private savePaper(journal: Journals) {
    this.journalService.createJournal(journal).subscribe({
      next: (res) => {
        this.isSaving = false;
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.log(err);
        this.isSaving = false;
        this.toastService.error('Error creating journal');
      },
    });
  }

  updateJournal() {
    const journalData = this.journalForm.getRawValue() as Journals
    journalData.Id = this.journalId
    this.journalService.updateJournal(journalData).subscribe({
      next: (res) => {
        this.isSaving = false;
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.log(err);
        this.isSaving = false;
        this.toastService.error('Error updating journal');
      },
    });
  }


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
