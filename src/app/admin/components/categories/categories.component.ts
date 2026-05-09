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
  destroy$: Subject<void> = new Subject<void>();
  categories: Category[] = [];

  private dialogReF!: MatDialogRef<any>;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: AppQuery<Category[]>) => {
          this.categories = res?.data;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });
  }

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

  onDeleteCategory(id: number): void {
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.getCategories();
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }
}
