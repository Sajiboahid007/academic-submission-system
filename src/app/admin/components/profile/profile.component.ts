import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserInfoService } from '../../services/user-info-service';
import { PapersService } from '../../services/papers-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertUpdateUserComponent } from '../user-list/insert-update-user/insert-update-user.component';
import { InsertUpdatePaperComponent } from '../papers-list/insert-update-paper/insert-update-paper.component';
import { JournalInsertUpdateComponent } from '../papers-list/journal-insert-update/journal-insert-update.component';
import { ToastService } from '../../../shared/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { FileService } from '../../services/file-service';
import { Users } from '../../../fds-config/entity-models/user';
import { BooleanInput } from '@angular/cdk/coercion';
import { JournalService } from '../../services/journal-service';
import { AppQuery } from '../../../shared/app-query';
import { Journals } from '../../../fds-config/entity-models/journals';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  userId!: number;
  userDetailedData: any = null;
  papers: any[] = [];
  journal: any[] = [];
  searchQuery = '';
  statusFilter = 'All';
  isUploading = false;
  users: Users = {} as Users;
  activeTab = '0';
  papersFirst = 0;
  papersRows = 10;
  journalsFirst = 0;
  journalsRows = 10;
  highlightedPaperId: number | null = null;
  highlightedJournalId: number | null = null;

  @ViewChild('otpModal') otpModal!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;
  verificationOtp = '';
  verifyingOtp = false;
  sendingVerificationEmail = false;
  resendCooldown = 0;
  private cooldownInterval: any;

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly papersService: PapersService,
    private readonly journalService: JournalService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly confirmationService: ConfirmationService,
    private readonly fileService: FileService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['first'] !== undefined) {
        const firstVal = Number(params['first']) || 0;
        if (params['type'] === 'journal' || params['tab'] === '1') {
          this.journalsFirst = firstVal;
          this.activeTab = '1';
        } else {
          this.papersFirst = firstVal;
          this.activeTab = '0';
        }
      }
      if (params['tab'] !== undefined) {
        this.activeTab = params['tab'];
      }
      if (params['paperId'] || params['id']) {
        const pid = Number(params['paperId'] || params['id']);
        if (params['type'] === 'journal' || params['tab'] === '1') {
          this.highlightedJournalId = pid;
        } else {
          this.highlightedPaperId = pid;
        }
      }
    });

    const userInfo = this.userInfoService.getUserInfo();
    if (userInfo && userInfo.userId) {
      this.userId = userInfo.userId;
      this.fetchUserProfile();
      this.fetchUserPapers();
      this.getJournalByUserId(this.userId);
    }
  }

  private fetchUserProfile(): void {
    this.userInfoService.getUsersById(this.userId).subscribe({
      next: (res: any) => {
        this.userDetailedData = res.data;
        this.userInfoService.setUserInfo(this.userDetailedData);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }

  fetchUserPapers(): void {
    this.papersService.getPapersByUserIdforProfile(this.userId).subscribe({
      next: (res: any) => {
        this.papers = res?.data || [];
        this.cdr.markForCheck();
        if (this.highlightedPaperId) {
          this.scrollToCard('paper-card-' + this.highlightedPaperId);
        }
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      },
    });
  }

  getJournalByUserId(id: number) {
    this.journalService.getJournalUploadId(id).subscribe({
      next: (res: AppQuery<Journals[]>) => {
        this.journal = res.data;
        this.cdr.markForCheck();
        if (this.highlightedJournalId) {
          this.scrollToCard('journal-card-' + this.highlightedJournalId);
        }
      },
      error: (error: any) => {
        this.toastService.error('Failed to load journals.');
      },
    });
  }

  getPaperStatus(paper: any): string {
    if (paper.Status) return paper.Status;

    const statuses = ['approved', 'submitted', 'draft'];
    return statuses[paper.Id % statuses.length];
  }

  get filteredPapers(): any[] {
    return this.papers.filter((paper) => {
      const matchesSearch =
        !this.searchQuery ||
        (paper.Title && paper.Title.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (paper.Abstract && paper.Abstract.toLowerCase().includes(this.searchQuery.toLowerCase()));

      return matchesSearch
    });
  }

  get filteredJournals(): any[] {
    return this.journal.filter((j) => {
      const matchesSearch =
        !this.searchQuery ||
        (j.Title && j.Title.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (j.Abstract && j.Abstract.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (j.Keywords && j.Keywords.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (j.Authors && j.Authors.toLowerCase().includes(this.searchQuery.toLowerCase()));


      return matchesSearch
    });
  }

  get paginatedPapers(): any[] {
    return this.filteredPapers.slice(this.papersFirst, this.papersFirst + this.papersRows);
  }

  get paginatedJournals(): any[] {
    return this.filteredJournals.slice(this.journalsFirst, this.journalsFirst + this.journalsRows);
  }

  onPapersPageChange(event: any) {
    this.papersFirst = event.first;
    this.papersRows = event.rows;
    this.router.navigate([], { relativeTo: this.route, queryParams: { first: this.papersFirst, tab: '0' }, queryParamsHandling: 'merge', replaceUrl: true });
    this.cdr.markForCheck();
  }

  onJournalsPageChange(event: any) {
    this.journalsFirst = event.first;
    this.journalsRows = event.rows;
    this.router.navigate([], { relativeTo: this.route, queryParams: { first: this.journalsFirst, tab: '1' }, queryParamsHandling: 'merge', replaceUrl: true });
    this.cdr.markForCheck();
  }

  onSearchQueryChange() {
    this.papersFirst = 0;
    this.journalsFirst = 0;
    this.cdr.markForCheck();
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

  editProfile(): void {
    const dialogRef = this.dialog.open(InsertUpdateUserComponent, {
      width: '600px',
      data: this.userDetailedData,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.fetchUserProfile();
      }
    });
  }

  uploadPaper(): void {
    const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
      width: '800px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.fetchUserPapers();
      }
    });
  }

  uploadJournal(): void {
    const dialogRef = this.dialog.open(JournalInsertUpdateComponent, {
      width: '800px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getJournalByUserId(this.userId);
      }
    });
  }

  viewPaper(id: number): void {
    this.router.navigate(['/dashboard/view-paper'], { queryParams: { id, type: 'paper', from: 'profile', first: this.papersFirst, tab: '0', paperId: id } });
  }

  viewJournal(id: number): void {
    this.router.navigate(['/dashboard/view-paper'], { queryParams: { id, type: 'journal', from: 'profile', first: this.journalsFirst, tab: '1', paperId: id } });
  }

  public imageUpload(id: number, file: File): void {
    this.isUploading = true;

    this.fileService.uploadFile(file).subscribe({
      next: (res) => {
        const imageUrl = res?.data?.url;

        if (imageUrl) {
          this.saveUserImage(id, imageUrl);
        } else {
          this.isUploading = false;
          this.toastService.error('Upload failed');
        }
      },

      error: (err) => {
        this.isUploading = false;
        console.error(err);
        this.toastService.error('Upload failed');
      },
    });
  }

  saveUserImage(id: number, imageUrl: string): void {
    this.userInfoService.updateImage(id, { ImageUrl: imageUrl }).subscribe({
      next: (_) => {
        this.isUploading = false;

        this.toastService.success('Profile picture updated successfully');
        this.fetchUserProfile();
      },

      error: (err) => {
        this.isUploading = false;
        console.error(err);
        this.toastService.error('Failed to update profile picture');
      },
    });
  }

  isPaperEditable(paper: any): boolean {
    const status = (paper?.PaperApprovals?.[0]?.Status || paper?.Status || '').toLowerCase();
    return status !== 'approved' && status !== 'editorial approved';
  }

  isJournalEditable(journal: any): boolean {
    const status = (journal?.PaperApprovals?.[0]?.Status || journal?.Status || '').toLowerCase();
    return status !== 'approved' && status !== 'editorial approved';
  }

  editPaper(paper: any): void {
    if (!this.isPaperEditable(paper)) {
      this.toastService.error('Approved papers cannot be edited.');
      return;
    }

    // Open paper dialog pre-populated for edit mode
    const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
      width: '800px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: paper,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.fetchUserPapers();
        this.toastService.success('Paper updated successfully');
      }
    });
  }

  editJournal(journal: any): void {
    if (!journal?.Id) return;

    if (!this.isJournalEditable(journal)) {
      this.toastService.error('Approved journals cannot be edited.');
      return;
    }

    this.journalService.getById(journal.Id).subscribe({
      next: (res) => {
        const fullJournal = res?.data || journal;
        const dialogRef = this.dialog.open(JournalInsertUpdateComponent, {
          width: '800px',
          height: '700px',
          maxWidth: 'none',
          autoFocus: true,
          data: fullJournal,
        });

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res) {
            this.getJournalByUserId(this.userId);
            this.toastService.success('Journal updated successfully');
          }
        });
      },
      error: () => {
        const dialogRef = this.dialog.open(JournalInsertUpdateComponent, {
          width: '800px',
          height: '700px',
          maxWidth: 'none',
          autoFocus: true,
          data: journal,
        });

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res) {
            this.getJournalByUserId(this.userId);
            this.toastService.success('Journal updated successfully');
          }
        });
      },
    });
  }

  deletePaper(id: number): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this paper?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.papersService.deletePaper(id).subscribe({
          next: () => {
            this.toastService.success('Paper deleted successfully');
            this.fetchUserPapers();
          },
          error: (err) => {
            console.error('Error deleting paper:', err);
            this.toastService.error('Failed to delete paper');
          },
        });
      },
    });
  }

  deleteJournal(id: number): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this journal?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.journalService.deleteJournal(id).subscribe({
          next: () => {
            this.toastService.success('Journal deleted successfully');
            this.getJournalByUserId(this.userId);
          },
          error: (err) => {
            console.error('Error deleting journal:', err);
            this.toastService.error('Failed to delete journal');
          },
        });
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const userId = this.userDetailedData?.Id;

    this.imageUpload(userId, file);
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

  shouldShowVerification(): boolean {
    const role = this.userDetailedData?.Roles?.Name?.toLowerCase();
    return role === 'student' || role === 'teacher' || role === 'reviewer';
  }

  startEmailVerification(): void {
    this.verificationOtp = '';
    this.verifyingOtp = false;
    this.sendingVerificationEmail = true;
    this.cdr.markForCheck();

    this.userInfoService.sendEmailVerification().subscribe({
      next: () => {
        this.sendingVerificationEmail = false;
        this.toastService.success('Verification code sent to your email.');
        this.startResendCooldown();
        this.dialogRef = this.dialog.open(this.otpModal, {
          width: '400px',
          disableClose: true,
        });
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.sendingVerificationEmail = false;
        console.error('Error sending verification code:', err);
        this.toastService.error('Failed to send verification code. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  startResendCooldown(): void {
    this.resendCooldown = 60;
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }
    this.cooldownInterval = setInterval(() => {
      if (this.resendCooldown > 0) {
        this.resendCooldown--;
      } else {
        clearInterval(this.cooldownInterval);
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  resendVerificationCode(): void {
    this.userInfoService.sendEmailVerification().subscribe({
      next: () => {
        this.toastService.success('Verification code resent.');
        this.startResendCooldown();
      },
      error: (err) => {
        console.error('Error resending verification code:', err);
        this.toastService.error('Failed to resend verification code.');
      },
    });
  }

  closeOtpModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }
  }

  submitOtp(): void {
    if (!this.verificationOtp || this.verificationOtp.length !== 6) {
      return;
    }
    this.verifyingOtp = true;
    this.cdr.markForCheck();

    this.userInfoService.confirmEmailVerification(this.verificationOtp).subscribe({
      next: (res) => {
        this.toastService.success('Email verified successfully!');
        this.closeOtpModal();
        this.fetchUserProfile();
      },
      error: (err) => {
        console.error('Error verifying OTP:', err);
        this.toastService.error(err?.error?.message || 'Invalid or expired verification code.');
        this.verifyingOtp = false;
        this.cdr.markForCheck();
      },
    });
  }
}

