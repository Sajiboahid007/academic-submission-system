import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Table } from 'primeng/table';
import { AppQuery } from '../../../../shared/app-query';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';
import { Category } from '../../../../fds-config/entity-models/categories';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories-service';
import { SubcategoryService } from '../../../services/subcategory-service';
import { ToastService } from '../../../../shared/services/toast.service';
import { JournalService } from '../../../services/journal-service';
import { Journals } from '../../../../fds-config/entity-models/journals';

@Component({
  selector: 'app-journal-list',
  standalone: false,
  templateUrl: './journal-list.component.html',
  styleUrl: './journal-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalListComponent {
  journal: any[] = [];
  loading: boolean = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  years: string[] = [];
  searchValue = '';

  first: number = 0;
  rows: number = 10;

  totalRecords: number = 0;

  allData: any[] = [];      // full list from API
  pagedData: any[] = [];    // visible list

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubcategoryService,
    private readonly toastService: ToastService,
    private readonly journalService: JournalService,
  ) { }

  ngOnInit(): void {
    this.getJournal();
    this.getCategory();
    this.getSubCategory();
  }

  getJournal() {
    this.journalService.getJournals().subscribe((res) => {
      this.journal = res.data;
      this.allData = res.data;
      this.totalRecords = res.data.length;
      this.updatePagedData();
      this.cdr.markForCheck();
    });
  }

  getCategory() {
    this.categoryService.getCategories().subscribe((res: AppQuery<Category[]>) => {
      this.categories = res.data;
      this.cdr.markForCheck();
    });
  }

  getSubCategory() {
    this.subCategoryService.getSubcategories().subscribe((res: AppQuery<SubCategory[]>) => {
      this.subCategories = res.data;
      this.cdr.markForCheck();
    });
  }

  viewJournal(id: number) {
    if (!id) return;
    this.journalService.getById(id).subscribe({
      next: (res) => {
        const fileUrl = res?.data?.FileUrl;

        if (!fileUrl) {
          console.log('No file available for this journal');
          return;
        }

        window.open(fileUrl, '_blank');
      },
      error: (err) => {
        console.error(err);
        console.log('Failed to open journal');
      },
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  public getSeverity(
    status: string | undefined,
  ): 'info' | 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Pending':
        return 'warn';
      case 'Draft':
        return 'info';
      default:
        return 'secondary';
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.first;
    const end = start + this.rows;

    this.pagedData = this.journal.slice(start, end);

    this.cdr.markForCheck();
  }

}
