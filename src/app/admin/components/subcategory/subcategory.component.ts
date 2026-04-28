import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../fds-config/entity-models/categories';
import { CategoriesService } from '../../services/categories-service';
import { Subcategory } from '../../services/subcategory';
import { SubcategoryInsertUpdateComponent } from './subcategory-insert-update/subcategory-insert-update.component';

@Component({
  selector: 'subcategory',
  standalone: false,
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryComponent implements OnInit, OnDestroy {
  subcategory: Subcategory[] = [];
  categories: Category[] = [];
  destroy$: Subject<void> = new Subject<void>();
  dataSource = new MatTableDataSource<Category>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['CategoryName', 'SubCategoryName', 'Status', 'Action'];

  constructor(
    private readonly subcategoryService: Subcategory,
    private readonly categoryService: CategoriesService,
    private readonly dialog: MatDialog,
  ) {}

  AddSubcategory() {
    const dialogRef = this.dialog.open(SubcategoryInsertUpdateComponent, {
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

  onEditSubcategory(Id: number) {}

  ngOnInit(): void {
    this.getSubcategories();
    this.getCategories();
  }
  getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.categories = response.data;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });
  }

  getSubcategories() {
    this.subcategoryService
      .getSubcategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.subcategory = response.data;
        },
        error: (error) => {
          console.error('Error fetching subcategories:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
