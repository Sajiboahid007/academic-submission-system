import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-insert-update-paper',
  standalone: false,
  templateUrl: './insert-update-paper.component.html',
  styleUrl: './insert-update-paper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdatePaperComponent implements OnInit {

  isEditMode = false;
  papers: Papers[] = []
  category: Category[] = [];
  subcategory: SubCategory[] = [];
  batch: Batches[] = [];
  department: Department[] = [];
  users: Users[] = [];

  papersForm!: FormGroup;

  constructor(private readonly papersService: PapersService,
    private readonly dialogRef: MatDialogRef<InsertUpdatePaperComponent>,
    private readonly categoryService: CategoriesService,
    private readonly batchService: BatchService,
    private readonly userService: UserInfoService,
    private readonly subcategoryService: SubcategoryService
  ) { }

  ngOnInit(): void {
    this.papersForm = this.papersService.papersFrom();

    const userInfo = this.userService.getUserInfo();

    //function call
    this.getCategory()
    this.getBatch()
    this.getSubcategory()
    this.getUserById(userInfo.userId);


    this.papersForm.markAllAsTouched();
  }






  getUserById(id: number) {
    this.userService.getUsersById(id).subscribe((res: any) => {
      this.users = res.data;
      this.papersForm.patchValue({

        UserId: res.data.Name,
        DepartmentId: res.data.Department?.Code,
      });
    });
    console.log(this.users)
  }

  getCategory() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.category = res.data;
      },

      error: (err) => {
        console.log(err);
      }
    });
  }

  getBatch() {
    this.batchService.getBatches().subscribe({
      next: (res) => {
        this.batch = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getSubcategory() {
    this.subcategoryService.getSubcategories().subscribe({
      next: (res) => {
        this.subcategory = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() { }

}
