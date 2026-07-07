import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info-service';
import { PapersService } from '../../services/papers-service';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly papersService: PapersService,
    private readonly journalService: JournalService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly confirmationService: ConfirmationService,
    private readonly fileService: FileService,
  ) { }

  ngOnInit(): void {
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
    this.papersService.getPapersByUserId(this.userId).subscribe({
      next: (res: any) => {
        this.papers = res?.data || [];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      },
    });
  }

  getJournalByUserId(id: number) {
    this.journalService.getJournalByUserId(id).subscribe({
      next: (res: AppQuery<Journals[]>) => {
        this.journal = res.data;
        this.cdr.markForCheck();
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

  viewJournal(id: number): void {
    const item = this.journal.find((j) => j.Id === id);

    if (item?.FileUrl) {
      const link = document.createElement('a');
      link.href = item.FileUrl;
      link.download = item.FileUrl.split('/').pop() || 'document.pdf';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      this.toastService.warn('No PDF file URL found.');
    }
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

  editPaper(paper: any): void {
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
      }
    });
  }

  editJournal(journal: any): void {
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
      }
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

