import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { AppQuery } from '../../../../shared/app-query';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';
import { Category } from '../../../../fds-config/entity-models/categories';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories-service';
import { SubcategoryService } from '../../../services/subcategory-service';
import { ToastService } from '../../../../shared/services/toast.service';
import { JournalService } from '../../../services/journal-service';

@Component({
  selector: 'app-journal-list',
  standalone: false,
  templateUrl: './journal-list.component.html',
  styleUrl: './journal-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalListComponent implements OnInit {
  journal: any[] = [];
  loading: boolean = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  years: string[] = [];
  searchValue = '';
  uniqueKeywords: any[] = [];

  // Filter selections (Name-based)
  selectedCategory: string | null = null;
  selectedSubCategory: string | null = null;
  selectedKeyword: string | null = null;
  selectedYear: string | null = null;

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
    this.getKeyword();
  }

  getJournal() {
    this.loading = true;
    this.cdr.markForCheck();

    this.journalService.getJournals().subscribe({
      next: (res) => {
        this.allData = res.data || [];
        this.journal = [...this.allData];
        this.totalRecords = this.journal.length;

        // Extract unique years from journals
        this.years = Array.from(
          new Set(this.allData.map((j) => j.Year).filter((year): year is string => !!year)),
        ).sort();

        this.applyFilters();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching journals:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getKeyword() {
    this.journalService.getKeyword().subscribe((res) => {
      this.uniqueKeywords = res.data || [];
      this.cdr.markForCheck();
    });
  }

  getCategory() {
    this.categoryService.getCategories().subscribe((res: AppQuery<Category[]>) => {
      this.categories = res?.data || [];
      this.cdr.markForCheck();
    });
  }

  getSubCategory() {
    this.subCategoryService.getSubcategories().subscribe((res: AppQuery<SubCategory[]>) => {
      this.subCategories = res?.data || [];
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

  applyFilters() {
    let temp = [...this.allData];

    // Global Search (Title, Abstract, Keywords)
    if (this.searchValue && this.searchValue.trim() !== '') {
      const query = this.searchValue.toLowerCase().trim();
      temp = temp.filter(
        (j) =>
          (j.Title && j.Title.toLowerCase().includes(query)) ||
          (j.Abstract && j.Abstract.toLowerCase().includes(query)) ||
          (j.Keywords && j.Keywords.toLowerCase().includes(query))
      );
    }

    // Dropdown filters
    if (this.selectedCategory) {
      temp = temp.filter((j) => {
        const name = j.Category?.Name || j.category?.Name || j.Category?.name || j.category?.name;
        return name === this.selectedCategory;
      });
    }
    if (this.selectedSubCategory) {
      temp = temp.filter((j) => {
        const name = j.SubCategory?.Name || j.subCategory?.Name || j.SubCategory?.name || j.subCategory?.name ||
          j.Subcategory?.Name || j.subcategory?.Name || j.Subcategory?.name || j.subcategory?.name;
        return name === this.selectedSubCategory;
      });
    }
    if (this.selectedKeyword) {
      temp = temp.filter((j) => {
        const kStr = j.Keywords || j.keywords || '';
        return kStr.toLowerCase().includes(this.selectedKeyword!.toLowerCase());
      });
    }
    if (this.selectedYear) {
      temp = temp.filter((j) => j.Year === this.selectedYear);
    }

    this.journal = temp;
    this.totalRecords = temp.length;
    this.first = 0; // Reset page to first
    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.first;
    const end = start + this.rows;
    this.pagedData = this.journal.slice(start, end);
    this.cdr.markForCheck();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedData();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const element = document.querySelector('.journal-list-layout-wrapper');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  clearFilters() {
    this.searchValue = '';
    this.selectedCategory = null;
    this.selectedSubCategory = null;
    this.selectedKeyword = null;
    this.selectedYear = null;
    this.applyFilters();
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
      case 'Review Requested':
        return 'warn';
      case 'Editorial Approved':
        return 'success';
      default:
        return 'secondary';
    }
  }
}
