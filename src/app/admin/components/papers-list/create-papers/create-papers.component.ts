import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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
import { UserInfoService } from '../../../services/user-info-service';
import { AppQuery } from '../../../../shared/app-query';
import { InsertUpdatePaperComponent } from '../insert-update-paper/insert-update-paper.component';
import { Table } from 'primeng/table';
import { PaperApprovalConfirmationComponent } from '../../../../shared/components/paper-approval-confirmation/paper-approval-confirmation.component';
import { AcademicSubmissionConfig } from '../../../../fds-config/constant/academic-submission-config';
import { ConfirmationService } from 'primeng/api';
import { JournalInsertUpdateComponent } from '../journal-insert-update/journal-insert-update.component';
import { Journals } from '../../../../fds-config/entity-models/journals';
import { JournalService } from '../../../services/journal-service';

@Component({
  selector: 'app-create-papers',
  standalone: false,
  templateUrl: './create-papers.component.html',
  styleUrl: './create-papers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePapersComponent {
  activeTab = '0';
  unfilteredPapers: Papers[] = [];
  unfilteredJournals: Journals[] = [];
  filterPaperId: number | null = null;
  filterJournalId: number | null = null;
  papers: Papers[] = [];
  journal: Journals[] = [];
  loading: boolean = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  departments: Department[] = [];
  batches: Batches[] = [];
  years: string[] = [];
  searchValue = '';
  userTokenInfo: any = {};

  constructor(
    private readonly papersService: PapersService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService,
    private readonly userInfoService: UserInfoService,
    private readonly journalService: JournalService,
    private readonly confirmationService: ConfirmationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.userTokenInfo = this.userInfoService.getUserInfo();
    this.getPapers();
    this.getJournals();

    this.route.queryParams.subscribe((params) => {
      if (params['tab'] === 'journal') {
        this.activeTab = '1';
        this.filterJournalId = Number(params['journalId']) || null;
      } else {
        this.activeTab = '0';
        this.filterPaperId = Number(params['paperId']) || null;
      }
      this.applyQueryParamsFilter();
    });
  }

  applyQueryParamsFilter() {
    if (this.filterPaperId) {
      this.papers = this.unfilteredPapers.filter(p => p.Id === this.filterPaperId);
    } else {
      this.papers = [...this.unfilteredPapers];
    }

    if (this.filterJournalId) {
      this.journal = this.unfilteredJournals.filter(j => j.Id === this.filterJournalId);
    } else {
      this.journal = [...this.unfilteredJournals];
    }
    this.cdr.markForCheck();
  }

  clearFilter() {
    this.filterPaperId = null;
    this.filterJournalId = null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: this.activeTab === '1' ? 'journal' : 'paper' },
      queryParamsHandling: 'merge'
    });
    this.applyQueryParamsFilter();
  }

  getPapers() {
    this.papersService
      .getPaperUploadsById(this.userTokenInfo.userId)
      .subscribe((res: AppQuery<Papers[]>) => {
        this.unfilteredPapers = res?.data || [];
        this.applyQueryParamsFilter();
        this.years = Array.from(
          new Set(this.unfilteredPapers.map((paper) => paper.Year).filter((year): year is string => !!year)),
        ).sort();
        this.cdr.markForCheck();
      });
  }

  getJournals() {
    this.journalService.getJournalUploadId(this.userTokenInfo.userId).subscribe({
      next: (res: AppQuery<Journals[]>) => {
        this.unfilteredJournals = res?.data || [];
        this.applyQueryParamsFilter();
      },
      error: (error: any) => {
        this.toastService.error('Failed to load journals.');
      },
    });
  }

  AddJournal() {
    const dialogRef = this.dialog.open(JournalInsertUpdateComponent, {
      width: '900px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.toastService.success('Paper created successfully!');
        this.getJournals();
      }
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
        this.toastService.success('Paper created successfully!');
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

  viewResponseLater(id: number) {
    if (!id) return;
    this.journalService.getById(id).subscribe({
      next: (res) => {
        const fileUrl = res?.data?.ResponseLater;

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

  editJournal(id: number) {
    this.journalService.getById(id).subscribe({
      next: (res) => {
        const journal = res?.data;

        const dialogRef = this.dialog.open(JournalInsertUpdateComponent, {
          width: '900px',
          height: '700px',
          maxWidth: 'none',
          autoFocus: true,
          data: journal,
        });

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res) {
            this.toastService.success('Journal updated successfully!');
            this.getJournals();
          }
        })
      },
      error: (error: any) => {
        console.error('Error fetching journal:', error);
        this.toastService.error('Failed to fetch journal details.');
      },
    })
  }

  deleteJournal(id: number) {
    const journal = this.journal.find((j) => j.Id === id);
    if (journal && journal.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Draft
      && journal.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Rejected) {
      this.toastService.error('Only draft or rejected journals can be deleted');
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete this journal?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.journalService.deleteJournal(id).subscribe({
          next: () => {
            this.toastService.success('Journal deleted successfully');
            this.getJournals();
          },
          error: (err) => {
            console.error('Error deleting journal:', err);
            this.toastService.error('Failed to delete journal');
          },
        });
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
      case 'Review Requested':
        return 'warn';
      case 'Editorial Approved':
        return 'success';
      default:
        return 'secondary';
    }
  }

  onApproveJournal(journalId: number) {
    const dialogRef = this.dialog.open(PaperApprovalConfirmationComponent, {
      width: '500px',
      autoFocus: true,
      data: { JournalId: journalId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getJournals();
      }
    });
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

  isAllowedStatus(paperApproval: any) {
    if (paperApproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Draft) {
      return true;
    }

    return false;
  }

  isUserAllowedToApproveOrEdit(paper: any) {
    const [paperAproval] = paper?.PaperApprovals;

    if (!this.isAllowedStatus(paperAproval)) {
      return false;
    }

    return true;
  }

  journalButton() {
    return this.userTokenInfo.role !== AcademicSubmissionConfig.UserRole.Student;
  }

  isPaperDeletable(paper: any): boolean {
    const status = paper?.PaperApprovals?.[0]?.Status;
    return status === AcademicSubmissionConfig.ApprovalStatus.Draft
      || status === AcademicSubmissionConfig.ApprovalStatus.Rejected;
  }

  isJournalDeletable(journal: any): boolean {
    const status = journal?.PaperApprovals?.[0]?.Status;
    return status === AcademicSubmissionConfig.ApprovalStatus.Draft
      || status === AcademicSubmissionConfig.ApprovalStatus.Rejected;
  }

  deletePaper(id: number): void {
    const paper = this.papers.find((p) => p.Id === id);
    if (paper && paper.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Draft
      && paper.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Rejected) {
      this.toastService.error('Only draft or rejected papers can be deleted');
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete this paper?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.papersService.deletePaper(id).subscribe({
          next: () => {
            this.toastService.success('Paper deleted successfully');
            this.getPapers();
          },
          error: (err) => {
            console.error('Error deleting paper:', err);
            this.toastService.error('Failed to delete paper');
          },
        });
      },
    });
  }
}
