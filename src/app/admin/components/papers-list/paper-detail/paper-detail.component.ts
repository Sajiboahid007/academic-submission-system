import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Papers } from '../../../../fds-config/entity-models/papers';
import { Category } from '../../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';
import { Department } from '../../../../fds-config/entity-models/department';
import { Batches } from '../../../../fds-config/entity-models/batch';
import { PapersService } from '../../../services/papers-service';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories-service';
import { SubcategoryService } from '../../../services/subcategory-service';
import { DepartmentService } from '../../../services/department-service';
import { BatchService } from '../../../services/batch-service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AppQuery } from '../../../../shared/app-query';
import { InsertUpdatePaperComponent } from '../insert-update-paper/insert-update-paper.component';
import { AcademicSubmissionConfig } from '../../../../fds-config/constant/academic-submission-config';

@Component({
  selector: 'app-paper-detail',
  standalone: false,
  templateUrl: './paper-detail.component.html',
  styleUrl: './paper-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperDetailComponent implements OnInit {
  papers: any[] = [];
  loading: boolean = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  departments: Department[] = [];
  batches: Batches[] = [];
  years: string[] = [];
  searchValue = '';

  // Filter selections (Name-based values)
  selectedCategory: string | null = null;
  selectedSubCategory: string | null = null;
  selectedDepartment: string | null = null;
  selectedBatch: string | null = null;
  selectedYear: string | null = null;

  // Filtered and paginated datasets
  filteredPapers: any[] = [];
  pagedPapers: any[] = [];

  // Paginator properties
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  highlightedId: number | null = null;

  constructor(
    private readonly papersService: PapersService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubcategoryService,
    private readonly departmentService: DepartmentService,
    private readonly batchService: BatchService,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['first'] !== undefined) {
        this.first = Number(params['first']) || 0;
      }
      if (params['paperId'] || params['id']) {
        this.highlightedId = Number(params['paperId'] || params['id']);
      }
    });

    this.getPapers();
    this.getCategory();
    this.getSubCategory();
    this.getDepartment();
    this.getBatch();
  }

  getPapers() {
    this.loading = true;
    this.cdr.markForCheck();

    this.papersService.getPapers().subscribe({
      next: (res: AppQuery<Papers[]>) => {
        this.papers = res?.data || [];

        this.years = Array.from(
          new Set(this.papers.map((paper) => paper.Year).filter((year): year is string => !!year)),
        ).sort();

        this.applyFilters(false);
        this.loading = false;
        this.cdr.markForCheck();

        if (this.highlightedId) {
          this.scrollToCard('paper-card-' + this.highlightedId);
        }
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
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

  getDepartment() {
    this.departmentService.getDepartments().subscribe((res: AppQuery<Department[]>) => {
      this.departments = res?.data || [];
      this.cdr.markForCheck();
    });
  }

  getBatch() {
    this.batchService.getBatches().subscribe((res: AppQuery<Batches[]>) => {
      this.batches = res?.data || [];
      this.cdr.markForCheck();
    });
  }

  applyFilters(resetPage: boolean = true) {
    let temp = [...this.papers];

    // Global search logic (Title or Abstract)
    if (this.searchValue && this.searchValue.trim() !== '') {
      const query = this.searchValue.toLowerCase().trim();
      temp = temp.filter(
        (paper) =>
          (paper.Title && paper.Title.toLowerCase().includes(query)) ||
          (paper.Abstract && paper.Abstract.toLowerCase().includes(query))
      );
    }

    // Dropdown filters (Robust case-insensitive check of names)
    if (this.selectedCategory) {
      temp = temp.filter((p) => {
        const name = p.Category?.Name || p.category?.Name || p.Category?.name || p.category?.name;
        return name === this.selectedCategory;
      });
    }
    if (this.selectedSubCategory) {
      temp = temp.filter((p) => {
        const name = p.SubCategory?.Name || p.subCategory?.Name || p.SubCategory?.name || p.subCategory?.name ||
          p.Subcategory?.Name || p.subcategory?.Name || p.Subcategory?.name || p.subcategory?.name;
        return name === this.selectedSubCategory;
      });
    }
    if (this.selectedDepartment) {
      temp = temp.filter((p) => {
        const name = p.Department?.Name || p.department?.Name || p.Department?.name || p.department?.name;
        return name === this.selectedDepartment;
      });
    }
    if (this.selectedBatch) {
      temp = temp.filter((p) => {
        const name = p.Batches?.Name || p.batches?.Name || p.Batches?.name || p.batches?.name ||
          p.Batch?.Name || p.batch?.Name || p.Batch?.name || p.batch?.name;
        return name === this.selectedBatch;
      });
    }
    if (this.selectedYear) {
      temp = temp.filter((p) => p.Year === this.selectedYear);
    }

    this.filteredPapers = temp;
    this.totalRecords = temp.length;

    if (resetPage) {
      this.first = 0;
    } else if (this.first >= this.totalRecords) {
      this.first = 0;
    }

    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.first;
    const end = start + this.rows;
    this.pagedPapers = this.filteredPapers.slice(start, end);
    this.cdr.markForCheck();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedData();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { first: this.first },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const element = document.querySelector('.paper-detail-layout-wrapper');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToCard(cardId: string) {
    setTimeout(() => {
      const element = document.getElementById(cardId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setTimeout(() => {
          const el = document.getElementById(cardId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 350);
      }
    }, 150);
  }

  clearFilters() {
    this.searchValue = '';
    this.selectedCategory = null;
    this.selectedSubCategory = null;
    this.selectedDepartment = null;
    this.selectedBatch = null;
    this.selectedYear = null;
    this.applyFilters();
  }

  AddPapers() {
    const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
      width: '900px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPapers();
      }
    });
  }

  editPaper(paperId: number) {
    this.papersService.getPaperById(paperId).subscribe({
      next: (res: AppQuery<Papers>) => {
        const paperToUpdate = res?.data;

        const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
          width: '900px',
          height: '700px',
          maxWidth: 'none',
          autoFocus: true,
          data: paperToUpdate,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.toastService.success('Paper updated successfully!');
            this.getPapers();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching paper:', error);
        this.toastService.error('Failed to fetch paper details.');
      },
    });
  }

  viewPaper(id: number) {
    const paper = this.papers.find((p) => p.Id === id);

    if (paper?.FileUrl) {
      const link = document.createElement('a');
      link.href = paper.FileUrl;
      link.download = paper.FileUrl.split('/').pop() || 'document.pdf';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn('No PDF file URL found.');
    }
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
}
