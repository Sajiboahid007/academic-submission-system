import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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

@Component({
  selector: 'app-create-papers',
  standalone: false,
  templateUrl: './create-papers.component.html',
  styleUrl: './create-papers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePapersComponent {
  papers: Papers[] = [];
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
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubcategoryService,
    private readonly departmentService: DepartmentService,
    private readonly batchService: BatchService,
    private readonly toastService: ToastService,
    private readonly userInfoService: UserInfoService
  ) { }

  ngOnInit(): void {
    this.userTokenInfo = this.userInfoService.getUserInfo();
    this.getPapers();
    this.getCategory();
    this.getSubCategory();
    this.getDepartment();
    this.getBatch();
  }

  getPapers() {
    this.papersService.getPapersByUserId(this.userTokenInfo.userId).subscribe((res: AppQuery<Papers[]>) => {
      this.papers = res.data;
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

  isAllowedStatus(paperApproval: any) {
    if (paperApproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Pending
      || paperApproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Draft) {
      return true;
    }

    return false;
  }

  isUserAllowedToApproveOrEdit(paper: any) {
    const [paperAproval] = paper?.PaperApprovals;

    if (!this.isAllowedStatus(paperAproval)) {
      return false;
    }

    const role = AcademicSubmissionConfig.UserRole;
    const paperGroups = paper?.PaperGroups || [];

    if ((this.userTokenInfo.role === role.Student ||
      this.userTokenInfo.role === role.Teacher)
      && this.isAllowedStatus(paperAproval)) {
      if (paperGroups.find((group: any) => group.UserId === this.userTokenInfo.userId)) {
        return true;
      }
    }

    // except for student and teacher, everyone can approve
    if (this.userTokenInfo.role !== role.Student &&
      this.userTokenInfo.role !== role.Teacher && this.isAllowedStatus(paperAproval)) {
      return true;
    }

    return false;
  }

}
