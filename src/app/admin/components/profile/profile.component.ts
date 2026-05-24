import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info-service';
import { PapersService } from '../../services/papers-service';
import { MatDialog } from '@angular/material/dialog';
import { InsertUpdateUserComponent } from '../user-list/insert-update-user/insert-update-user.component';
import { InsertUpdatePaperComponent } from '../papers-list/insert-update-paper/insert-update-paper.component';
import { ToastService } from '../../../shared/services/toast.service';
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
  searchQuery = '';
  statusFilter = 'All';

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly papersService: PapersService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService,
  ) { }

  ngOnInit(): void {
    const userInfo = this.userInfoService.getUserInfo();
    if (userInfo && userInfo.userId) {
      this.userId = userInfo.userId;
      this.fetchUserProfile();
      this.fetchUserPapers();
    }
  }

  fetchUserProfile(): void {
    this.userInfoService.getUsersById(this.userId).subscribe({
      next: (res: any) => {
        this.userDetailedData = res.data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }

  fetchUserPapers(): void {
    this.papersService.getPapers().subscribe({
      next: (res: any) => {
        // Only show papers belonging to the active logged-in user
        this.papers = (res.data || []).filter((paper: any) => paper.UserId === this.userId);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      },
    });
  }

  getPaperStatus(paper: any): string {
    if (paper.Status) return paper.Status;
    // Dynamic mock fallback based on paper ID to match premium mockup states
    const statuses = ['approved', 'submitted', 'draft'];
    return statuses[paper.Id % statuses.length];
  }

  get filteredPapers(): any[] {
    return this.papers.filter((paper) => {
      const matchesSearch =
        !this.searchQuery ||
        (paper.Title && paper.Title.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (paper.Abstract && paper.Abstract.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const paperStatus = this.getPaperStatus(paper);
      const matchesStatus =
        this.statusFilter === 'All' ||
        paperStatus.toLowerCase() === this.statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
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
      height: '650px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.fetchUserPapers();
      }
    });
  }

  viewPaper(paper: any): void {
    if (paper.FileUrl) {
      window.open(paper.FileUrl, '_blank');
    } else {
      this.toastService.success(`Viewing paper details: ${paper.Title}`);
    }
  }

  editPaper(paper: any): void {
    // Open paper dialog pre-populated for edit mode
    const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
      width: '800px',
      height: '650px',
      autoFocus: true,
      data: paper,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.fetchUserPapers();
      }
    });
  }

  deletePaper(id: number): void {
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
  }
}
