import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaperApprovals } from '../../../fds-config/entity-models/approval';
import { ApprovalService } from '../../services/approval-service';
import { PaperApprovalConfirmationComponent } from '../../../shared/components/paper-approval-confirmation/paper-approval-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { UserInfoService } from '../../services/user-info-service';
import { Papers } from '../../../fds-config/entity-models/papers';
import { PapersService } from '../../services/papers-service';
import { InsertUpdatePaperComponent } from '../papers-list/insert-update-paper/insert-update-paper.component';
import { AppQuery } from '../../../shared/app-query';
import { Journals } from '../../../fds-config/entity-models/journals';
import { privateDecrypt } from 'crypto';
import { JournalService } from '../../services/journal-service';
import { JournalInsertUpdateComponent } from '../papers-list/journal-insert-update/journal-insert-update.component';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-paper-approval',
  standalone: false,
  templateUrl: './paper-approval.component.html',
  styleUrl: './paper-approval.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperApprovalComponent implements OnInit {
  aprovals: PaperApprovals[] = [];
  userTokenInfo: any = {};
  papers: Papers[] = [];
  journal: Journals[] = [];
  activeTab: string = '0';

  loading: boolean = false;

  constructor(
    private readonly approvalService: ApprovalService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService,
    private readonly userInfoService: UserInfoService,
    private readonly papersService: PapersService,
    private readonly journalService: JournalService,
    private readonly confirmationService: ConfirmationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly notifyService: NotificationService
  ) { }

  unfilteredPapers: Papers[] = [];
  unfilteredJournals: Journals[] = [];
  filterPaperId: number | null = null;
  filterJournalId: number | null = null;

  usersMap = new Map<number, any>();
  usersMapByName = new Map<string, any>();

  ngOnInit(): void {
    this.userTokenInfo = this.userInfoService.getUserInfo();
    this.getUsers();

    const userRole = this.userTokenInfo?.role;
    const { Student: studentRole, Teacher: teacherRole, SuperAdmin: superAdmin, Admin: admin, Reviewer: Reviewer } = AcademicSubmissionConfig.UserRole;

    if (userRole === studentRole || userRole === teacherRole || userRole === Reviewer) {
      this.userPapers(Number(this.userTokenInfo?.userId));
      this.getJournalByUserId(Number(this.userTokenInfo?.userId));
    } else {
      this.getApprovalList();
      this.getJounals();
    }

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

  public getApprovalList() {
    try {
      this.papersService.getNonApprovalPapers().subscribe((res: AppQuery<Papers[]>) => {
        this.unfilteredPapers = (res.data || []).filter(
          (p: any) =>
            p.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Draft &&
            p.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Approved
        );
        this.applyQueryParamsFilter();
      });
    } catch (error) {
      console.error('Error fetching approval list:', error);
    }
  }

  getJournalByUserId(id: number) {
    this.journalService.getJournalByUserId(id).subscribe({
      next: (res: AppQuery<Journals[]>) => {
        let list = res.data || [];
        if (this.userTokenInfo.role === AcademicSubmissionConfig.UserRole.Reviewer) {
          list = list.filter(
            (j: any) => j.PaperApprovals?.[0]?.Status === AcademicSubmissionConfig.ApprovalStatus.ReviewRequested
          );
        } else {
          list = list.filter(
            (j: any) =>
              j.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Draft &&
              j.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Approved
          );
        }
        this.unfilteredJournals = list;
        this.applyQueryParamsFilter();
      },
      error: (error: any) => {
        this.toastService.error('Failed to load journals.');
      },
    });
  }

  getJounals() {
    this.journalService.getNonApprovedJournals().subscribe({
      next: (res: AppQuery<Journals[]>) => {
        let list = res.data || [];
        if (this.userTokenInfo.role === AcademicSubmissionConfig.UserRole.Reviewer) {
          list = list.filter(
            (j: any) => j.PaperApprovals?.[0]?.Status === AcademicSubmissionConfig.ApprovalStatus.ReviewRequested
          );
        } else {
          list = list.filter(
            (j: any) =>
              j.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Draft &&
              j.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Approved
          );
        }
        this.unfilteredJournals = list;
        this.applyQueryParamsFilter();
      },
      error: (error: any) => {
        this.toastService.error('Failed to load journals.');
      },
    });
  }

  public getSeverity(
    status: string | undefined,
  ): 'info' | 'success' | 'warn' | 'danger' | 'secondary' {
    if (!status) return 'secondary';
    switch (status.trim().toLowerCase()) {
      case 'approved':
      case 'editorial approved':
        return 'success';
      case 'rejected':
      case 'reviewer reject':
        return 'danger';
      case 'pending':
      case 'review requested':
        return 'warn';
      case 'draft':
        return 'info';
      default:
        return 'secondary';
    }
  }

  private userPapers(id: number) {
    this.papersService.getPapersByUserId(id).subscribe({
      next: (res: any) => {
        this.unfilteredPapers = (res?.data || []).filter(
          (p: any) =>
            p.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Draft &&
            p.PaperApprovals?.[0]?.Status !== AcademicSubmissionConfig.ApprovalStatus.Approved
        );
        this.applyQueryParamsFilter();
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      },
    });
  }

  isAllowedStatus(paperApproval: any) {
    const status = paperApproval?.Status;
    const role = this.userTokenInfo?.role;

    if (
      status === AcademicSubmissionConfig.ApprovalStatus.Pending ||
      status === AcademicSubmissionConfig.ApprovalStatus.Draft ||
      status === AcademicSubmissionConfig.ApprovalStatus.EditorialApproved ||
      status === AcademicSubmissionConfig.ApprovalStatus.ReviewRequested ||
      status === AcademicSubmissionConfig.ApprovalStatus.ReviewerReject ||
      status === AcademicSubmissionConfig.ApprovalStatus.Rejected
    ) {
      if (status === AcademicSubmissionConfig.ApprovalStatus.ReviewerReject || status === AcademicSubmissionConfig.ApprovalStatus.Rejected) {
        return role === AcademicSubmissionConfig.UserRole.SuperAdmin || role === AcademicSubmissionConfig.UserRole.Admin;
      }
      return true;
    }

    return false;
  }

  canEditPaper(approval: any): boolean {
    return this.isUserAllowedToApproveOrEdit(approval);
  }

  editPaper(paperId: any) {
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
            // this.getApprovalList();
            if (this.userTokenInfo.role == 'Student' || this.userTokenInfo.role == 'Teacher') {
              this.userPapers(this.userTokenInfo?.userId);
            } else {
              this.getApprovalList();
            }
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching paper:', error);
        this.toastService.error('Failed to fetch paper details.');
      },
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
            if (this.userTokenInfo.role == 'Teacher') {
              this.getJournalByUserId(this.userTokenInfo?.userId);
            } else {
              this.getJounals();
            }
          }
        })
      },
      error: (error: any) => {
        console.error('Error fetching journal:', error);
        this.toastService.error('Failed to fetch journal details.');
      },
    })
  }


  isUserAllowedToApproveOrEdit(paper: any) {
    const [paperAproval] = paper?.PaperApprovals;

    if (!this.isAllowedStatus(paperAproval)) {
      return false;
    }

    const role = AcademicSubmissionConfig.UserRole;
    const paperGroups = paper?.PaperGroups || [];

    if (
      this.userTokenInfo.role === role.Teacher &&
      this.isAllowedStatus(paperAproval)
    ) {
      if (paperGroups.find((group: any) => group.UserId === this.userTokenInfo.userId)) {
        return true;
      }
    }

    // except for student and teacher, everyone can approve
    if (
      this.userTokenInfo.role !== role.Teacher &&
      this.isAllowedStatus(paperAproval)
    ) {
      return true;
    }

    return false;
  }

  onApprove(paperId: any) {
    const userRole = this.userTokenInfo?.role;
    const { Student: studentRole, Teacher: teacherRole, SuperAdmin: superAdmin, Admin: admin, Reviewer: Reviewer } = AcademicSubmissionConfig.UserRole;

    const dialogRef = this.dialog.open(PaperApprovalConfirmationComponent, {
      width: '600px',
      // height: '500px',
      autoFocus: true,
      data: { PaperId: paperId, Source: 'Paper', fromPaperApproval: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (userRole === studentRole || userRole === teacherRole) {
          this.userPapers(Number(this.userTokenInfo?.userId));
          this.getJournalByUserId(Number(this.userTokenInfo?.userId));
        } else {
          this.getApprovalList();
          this.getJounals();
        }
      }
    });
  }

  onApproveJournal(journalId: number) {
    const role = AcademicSubmissionConfig.UserRole;
    const dialogRef = this.dialog.open(PaperApprovalConfirmationComponent, {
      width: '500px',
      autoFocus: true,
      data: { JournalId: journalId, Source: 'Journal', fromPaperApproval: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.userTokenInfo?.role === role.SuperAdmin || this.userTokenInfo?.role === role.Admin) {
          this.getJounals();
        } else {
          this.getJournalByUserId(this.userTokenInfo?.userId);
        }

      }
    });
  }
  viewPaper(paperId: number) {
    if (!paperId) return;
    this.papersService.getPaperById(paperId).subscribe({
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

  isUserAllowedToDelete(): boolean {
    const role = AcademicSubmissionConfig.UserRole;
    const userRole = this.userTokenInfo?.role;

    // Only allow if the user has the SuperAdmin or Admin role
    if (userRole === role.SuperAdmin || userRole === role.Admin) {
      return true;
    }

    return false;
  }

  onDeletePaper(paperId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this paper?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.papersService.deletePaper(paperId).subscribe({
          next: () => {
            this.toastService.success('Paper deleted successfully!');
            this.getApprovalList();
          },
          error: (error: any) => {
            console.error('Error deleting paper:', error);
            this.toastService.error('Failed to delete paper.');
          },
        });
      },
    });
  }

  onDeleteJournal(journalId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this journal?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.journalService.deleteJournal(journalId).subscribe({
          next: () => {
            this.toastService.success('Journal deleted successfully!');
            this.getJounals();
          },
          error: (error: any) => {
            console.error('Error deleting journal:', error);
            this.toastService.error('Failed to delete journal.');
          },
        });
      },
    });
  }

  onApproved() {
    const role = AcademicSubmissionConfig.UserRole;
    const userRole = this.userTokenInfo?.role;

    // Only allow if the user has the SuperAdmin or Admin role
    if (userRole === role.SuperAdmin || userRole === role.Admin || userRole === role.Teacher || userRole === role.Reviewer) {
      return true;
    }

    return false;
  }

  getUsers() {
    this.userInfoService.getUsers().subscribe({
      next: (res: any) => {
        const list = res?.data || [];
        this.usersMap.clear();
        this.usersMapByName.clear();
        list.forEach((u: any) => {
          if (u?.Id) this.usersMap.set(Number(u.Id), u);
          if (u?.Name) this.usersMapByName.set(u.Name.trim().toLowerCase(), u);
        });
        this.cdr.markForCheck();
      },
      error: (err: any) => console.error('Error fetching users:', err)
    });
  }

  getReviewerNames(journal: any): string {
    if (!journal?.PaperGroups) return '';
    return journal.PaperGroups
      .filter((item: any) => item?.UserType === 'Reviewer')
      .map((item: any) => item?.Users?.Name)
      .filter(Boolean)
      .join(', ');
  }

  getAuthorsList(item: any): any[] {
    if (!item) return [];

    const authors: any[] = [];
    const addedUserIds = new Set<number>();
    const addedNames = new Set<string>();

    const addAuthor = (userId: number | null, rawName: string, deptName?: string, rawImg?: string) => {
      if (!rawName) return;
      const name = rawName.trim();
      if (!name) return;

      const cleanNameKey = name.toLowerCase();

      let userFromMap = userId ? this.usersMap.get(Number(userId)) : null;
      if (!userFromMap) {
        userFromMap = this.usersMapByName.get(cleanNameKey);
      }

      const uId = userFromMap?.Id || userId;
      if (uId && addedUserIds.has(Number(uId))) return;
      if (!uId && addedNames.has(cleanNameKey)) return;

      if (uId) addedUserIds.add(Number(uId));
      addedNames.add(cleanNameKey);

      let dept =
        deptName ||
        userFromMap?.Department?.Name ||
        (typeof userFromMap?.Department === 'string' ? userFromMap.Department : null) ||
        (userFromMap?.DepartmentId && userFromMap.DepartmentId) ||
        '';

      let img =
        rawImg ||
        userFromMap?.ImageUrl ||
        userFromMap?.Image ||
        userFromMap?.imageUrl;

      if (img && !img.startsWith('http://') && !img.startsWith('https://') && !img.startsWith('data:')) {
        const baseUrl = AcademicSubmissionConfig.BaseUrl;
        img = img.startsWith('/') ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
      }

      authors.push({
        id: uId,
        name: name,
        department: dept,
        imageUrl: img || '',
      });
    };

    // 1. From PaperGroups (excluding Reviewers)
    const groups = item?.PaperGroups || [];
    groups.forEach((g: any) => {
      const userType = g?.UserType;
      const roleName = g?.Users?.Roles?.Name || g?.User?.Roles?.Name;
      if (userType === 'Reviewer' || roleName === 'Reviewer') return;

      const gUserId = g?.UserId || g?.UsersId || g?.Users?.Id || g?.User?.Id;
      const gName = g?.Users?.Name || g?.User?.Name || g?.Name;
      const gDept =
        g?.Users?.Department?.Name ||
        g?.User?.Department?.Name ||
        g?.Department?.Name ||
        (typeof g?.Users?.Department === 'string' ? g.Users.Department : null);
      const gImg = g?.Users?.ImageUrl || g?.Users?.Image || g?.User?.ImageUrl || g?.ImageUrl;

      addAuthor(gUserId ? Number(gUserId) : null, gName, gDept, gImg);
    });

    // 2. From item.Users / item.UserId
    if (item?.Users?.Name || item?.UserId) {
      const uId = item?.UserId || item?.Users?.Id;
      const uName = item?.Users?.Name;
      const uDept = item?.Users?.Department?.Name || item?.Department?.Name;
      const uImg = item?.Users?.ImageUrl || item?.Users?.Image;
      addAuthor(uId ? Number(uId) : null, uName, uDept, uImg);
    }

    // 3. From item.Authors string fallback
    if (item?.Authors) {
      const names = item.Authors.split(',');
      names.forEach((n: string) => {
        const trimmed = n.trim();
        if (trimmed) {
          addAuthor(null, trimmed);
        }
      });
    }

    return authors;
  }

  getAuthorNames(item: any): string {
    const list = this.getAuthorsList(item);
    if (list.length > 0) {
      return list.map((a) => a.name).join(', ');
    }
    return item?.Authors || item?.Users?.Name || '-';
  }

  getSupervisorsList(paper: any): any[] {
    if (!paper?.PaperGroups) return [];

    const supervisors: any[] = [];
    const addedUserIds = new Set<number>();
    const addedNames = new Set<string>();

    paper.PaperGroups.forEach((g: any) => {
      const userType = g?.UserType;
      const roleName = g?.Users?.Roles?.Name || g?.User?.Roles?.Name;
      if (userType !== 'Teacher' && roleName !== 'Teacher') return;

      const userId = g?.UserId || g?.UsersId || g?.Users?.Id || g?.User?.Id;
      const rawName = g?.Users?.Name || g?.User?.Name || g?.Name;
      if (!rawName) return;

      const name = rawName.trim();
      const cleanNameKey = name.toLowerCase();

      let userFromMap = userId ? this.usersMap.get(Number(userId)) : null;
      if (!userFromMap) {
        userFromMap = this.usersMapByName.get(cleanNameKey);
      }

      const uId = userFromMap?.Id || userId;
      if (uId && addedUserIds.has(Number(uId))) return;
      if (!uId && addedNames.has(cleanNameKey)) return;

      if (uId) addedUserIds.add(Number(uId));
      addedNames.add(cleanNameKey);

      let dept =
        g?.Users?.Department?.Name ||
        g?.User?.Department?.Name ||
        g?.Department?.Name ||
        userFromMap?.Department?.Name ||
        paper?.Department?.Name ||
        '';

      let img =
        g?.Users?.ImageUrl ||
        g?.Users?.Image ||
        g?.User?.ImageUrl ||
        g?.ImageUrl ||
        userFromMap?.ImageUrl ||
        userFromMap?.Image;

      if (img && !img.startsWith('http://') && !img.startsWith('https://') && !img.startsWith('data:')) {
        const baseUrl = AcademicSubmissionConfig.BaseUrl;
        img = img.startsWith('/') ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
      }

      supervisors.push({
        id: uId,
        name: name,
        department: dept,
        imageUrl: img || '',
      });
    });

    return supervisors;
  }

  viewResponseLater(id: number) {
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
  fileUrl: any;
  viewReviewerLater(id: number) {
    this.journalService.getById(id).subscribe({
      next: (res: any) => {
        this.fileUrl = res?.data?.PaperApprovals?.[0]?.RemarksFile;

        if (!this.fileUrl) {
          console.warn('No file URL found');
          return;
        }
        window.open(this.fileUrl, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
