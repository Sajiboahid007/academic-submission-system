import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PapersService } from '../../services/papers-service';
import { Papers } from '../../../fds-config/entity-models/papers';
import { AppQuery } from '../../../shared/app-query';
import { MatDialog } from '@angular/material/dialog';
import { InsertUpdatePaperComponent } from './insert-update-paper/insert-update-paper.component';
import { Category } from '../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../fds-config/entity-models/subcategory';
import { Department } from '../../../fds-config/entity-models/department';
import { Batches } from '../../../fds-config/entity-models/batch';
import { CategoriesService } from '../../services/categories-service';
import { SubcategoryService } from '../../services/subcategory-service';
import { DepartmentService } from '../../services/department-service';
import { BatchService } from '../../services/batch-service';
import { Table } from 'primeng/table';
import { PaperApprovalConfirmationComponent } from '../../../shared/components/paper-approval-confirmation/paper-approval-confirmation.component';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { Journals } from '../../../fds-config/entity-models/journals';
import { JournalService } from '../../services/journal-service';

@Component({
  selector: 'app-papers-list',
  standalone: false,
  templateUrl: './papers-list.component.html',
  styleUrl: './papers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapersListComponent implements OnInit {
  papers: Papers[] = [];
  journal: Journals[] = []
  loading: boolean = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  departments: Department[] = [];
  batches: Batches[] = [];
  years: string[] = [];
  searchValue = '';

  constructor(
    private readonly papersService: PapersService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubcategoryService,
    private readonly departmentService: DepartmentService,
    private readonly batchService: BatchService,
    private readonly toastService: ToastService,
    private readonly journalService: JournalService
  ) { }

  ngOnInit(): void {
    this.getPapers();
    this.getJournal()
    this.getCategory();
    this.getSubCategory();
    this.getDepartment();
    this.getBatch();
  }

  getPapers() {
    this.papersService.getPapers().subscribe((res: AppQuery<Papers[]>) => {
      this.papers = res.data;
      this.years = Array.from(
        new Set(this.papers.map((paper) => paper.Year).filter((year): year is string => !!year)),
      ).sort();
      this.cdr.markForCheck();
    });
  }

  getJournal() {
    this.journalService.getJournals().subscribe((res: AppQuery<Journals[]>) => {
      this.journal = res.data;
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

  getDepartment() {
    this.departmentService.getDepartments().subscribe((res: AppQuery<Department[]>) => {
      this.departments = res.data;
      this.cdr.markForCheck();
    });
  }

  getBatch() {
    this.batchService.getBatches().subscribe((res: AppQuery<Batches[]>) => {
      this.batches = res.data;
      this.cdr.markForCheck();
    });
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

  viewJournal(id: number) {
    if (!id) return;
    this.journalService.getById(id).subscribe({
      next: (res) => {
        const fileUrl = res?.data?.FileUrl;

        if (!fileUrl) {
          console.warn('No file URL found');
          return;
        }

        window.open(fileUrl, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
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

  onApprove(paperId: any) {
    const dialogRef = this.dialog.open(PaperApprovalConfirmationComponent, {
      width: '500px',
      autoFocus: true,
      data: { PaperId: paperId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPapers();
      }
    });
  }

  isUserAllowedToApproveOrEdit(paper: any) {
    const [paperAproval] = paper?.PaperApprovals;

    if (
      paperAproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Draft ||
      paperAproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Pending
    ) {
      false;
    }
    return false;
  }
}
