import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../fds-config/entity-models/categories';
import { AppQuery } from '../../../shared/app-query';
import { CategoriesService } from '../../services/categories-service';
import { CategoryInsertUpdateComponent } from './category-insert-update/category-insert-update.component';
@Component({
  selector: 'categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild('CategoryModal') CategoryModal!: TemplateRef<any>;
  destroy$: Subject<void> = new Subject<void>();
  categories: Category[] = [];
  meters: any[] = [];

  CategoryEditId: number = 0;

  dataSource = new MatTableDataSource<Category>([]);
  private dialogReF!: MatDialogRef<any>;

  displayedColumns = ['Name', 'Code', 'Action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    console.log('Categories fetched:', this.categories);
  }

  getCategories(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: AppQuery<Category[]>) => {
          this.categories = res?.data;
          // this.manageMeter();
          this.dataSource.data = this.categories;
          this.dataSource.paginator = this.paginator;

          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });
    console.log('Categories after fetch call:', this.categories);
  }

  // openAddModal(isEdit: boolean = false): void {
  //   if (!isEdit) {
  //     this.CategoryEditId = 0;
  //   }
  //   this.dialogReF = this.dialog.open(this.CategoryModal, {
  //     width: '600px',
  //     disableClose: false,
  //     autoFocus: false,
  //     data: { id: this.CategoryEditId },
  //   });
  // }

  AddCategory(): void {
    const dialogRef = this.dialog.open(CategoryInsertUpdateComponent, {
      width: '500px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }

  onEditCategory(id: number): void {
    this.categoriesService.getCategoryById(id).subscribe({
      next: (res: AppQuery<Category>) => {
        const category = res?.data;

        const dialogRef = this.dialog.open(CategoryInsertUpdateComponent, {
          width: '500px',
          autoFocus: true,
          data: category,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.getCategories();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching category:', error);
      },
    });
  }

  // private manageMeter() {
  //   const active = this.categories.filter((item) => item.Status).length;
  //   const inActive = this.categories.filter((item) => !item.Status).length;
  //   this.meters = [
  //     { label: 'Active', value: active, color: 'green' },
  //     { label: 'Inactive', value: inActive, color: 'red' },
  //   ];
  // }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }
}
