import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SubCategory } from '../../../fds-config/entity-models/subcategory';
import { AppQuery } from '../../../shared/app-query';
import { SubcategoryService } from '../../services/subcategory-service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-subcategory-list',
  standalone: false,
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryListComponent implements OnInit, OnDestroy {
  @ViewChild('subCategoryModal') subCategoryModal!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

  destroy$: Subject<void> = new Subject<void>();
  subcategories: SubCategory[] = [];

  subCategoryEditId: number = 0;

  constructor(
    private readonly dialog: MatDialog,
    private readonly subcategoryService: SubcategoryService,
    private readonly cdr: ChangeDetectorRef,
    private readonly confirmationService: ConfirmationService,
    private readonly toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getSubcategories();
  }

  getSubcategories(): void {
    this.subcategoryService
      .getSubcategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: AppQuery<SubCategory[]>) => {
          this.subcategories = res?.data || [];
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error fetching subcategories:', error);
        },
      });
  }

  openAddModal(isEdit: boolean = false): void {
    if (!isEdit) {
      this.subCategoryEditId = 0;
    }
    this.dialogRef = this.dialog.open(this.subCategoryModal, {
      width: '600px',
      height: 'fit-content',
      disableClose: false,
      autoFocus: false,
      data: { id: this.subCategoryEditId },
    });
  }

  closeModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.getSubcategories();
    }
  }

  onEditSubcategory(id: number): void {
    this.subCategoryEditId = id;
    this.cdr.markForCheck();
    this.openAddModal(true);
  }

  public onDeleteSubcategory(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Confirm Deletion',
      accept: () => {
        this.subcategoryService.deleteSubcategory(id).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.toastService.success('Sub category deleted successfully!');
            this.getSubcategories();
          },
          error: (error) => {
            console.error('Error deleting subcategory:', error);
            this.toastService.error('Failed to delete sub category!');
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }
}
