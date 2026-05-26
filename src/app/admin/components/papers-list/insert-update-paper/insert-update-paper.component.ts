import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Papers } from '../../../../fds-config/entity-models/papers';
import { FormGroup } from '@angular/forms';
import { PapersService } from '../../../services/papers-service';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';
import { Department } from '../../../../fds-config/entity-models/department';
import { Batches } from '../../../../fds-config/entity-models/batch';
import { CategoriesService } from '../../../services/categories-service';
import { DepartmentService } from '../../../services/department-service';
import { BatchService } from '../../../services/batch-service';
import { SubcategoryService } from '../../../services/subcategory-service';
import { UserInfoService } from '../../../services/user-info-service';
import { Users } from '../../../../fds-config/entity-models/user';
import { AcademicSubmissionConfig } from '../../../../fds-config/constant/academic-submission-config';

@Component({
  selector: 'app-insert-update-paper',
  standalone: false,
  templateUrl: './insert-update-paper.component.html',
  styleUrl: './insert-update-paper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdatePaperComponent implements OnInit {
  isEditMode = false;
  papers: Papers[] = [];
  category: Category[] = [];
  subcategory: SubCategory[] = [];
  batches: Batches[] = [];
  departments: Department[] = [];

  // users
  users: Users[] = [];
  students: Users[] = [];
  teachers: Users[] = [];

  papersForm!: FormGroup;

  constructor(
    private readonly papersService: PapersService,
    private readonly dialogRef: MatDialogRef<InsertUpdatePaperComponent>,
    private readonly categoryService: CategoriesService,
    private readonly batchService: BatchService,
    private readonly userService: UserInfoService,
    private readonly subcategoryService: SubcategoryService,
    private readonly departmentService: DepartmentService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.papersForm = this.papersService.papersFrom();

    //function call
    this.getCategory();
    this.getBatch();
    this.getSubcategory();
    this.getUsers();
    this.getDepartment();

    this.papersForm.markAllAsTouched();
  }

  getDepartment() {
    this.departmentService.getDepartments().subscribe({
      next: (res) => {
        this.departments = res.data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.data as Users[];

      this.students = this.users.filter(
        (user) => user?.Roles?.Name === AcademicSubmissionConfig.UserRole.Student,
      );

      this.teachers = this.users.filter(
        (user) => user?.Roles?.Name === AcademicSubmissionConfig.UserRole.Teacher,
      );
      this.cdr.markForCheck();
    });
  }

  getCategory() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.category = res.data;
        this.cdr.markForCheck();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  getBatch() {
    this.batchService.getBatches().subscribe({
      next: (res) => {
        this.batches = res.data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSubcategory() {
    this.subcategoryService.getSubcategories().subscribe({
      next: (res) => {
        this.subcategory = res.data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.papersForm.invalid) {
      this.papersForm.markAllAsTouched();
      return;
    }

    this.papersService.createPaper(this.papersForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onUpload() {}
}
