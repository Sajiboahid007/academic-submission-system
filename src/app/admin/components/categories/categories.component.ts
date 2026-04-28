import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  meters: any[] = [];

  dataSource = new MatTableDataSource<Category>([]);

  displayedColumns = ['Name', 'Status', 'Image', 'Action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories = [];

    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: AppQuery<Category[]>) => {
          this.categories = res?.data ?? [];
          this.manageMeter();
          this.dataSource.data = this.categories;
          this.dataSource.paginator = this.paginator;

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

  private manageMeter() {
    const active = this.categories.filter((item) => item.Status).length;
    const inActive = this.categories.filter((item) => !item.Status).length;
    this.meters = [
      { label: 'Active', value: active, color: 'green' },
      { label: 'Inactive', value: inActive, color: 'red' },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }
}
