import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info-service';
import { PapersService } from '../../services/papers-service';
import { MatDialog } from '@angular/material/dialog';
import { InsertUpdateUserComponent } from '../user-list/insert-update-user/insert-update-user.component';
import { InsertUpdatePaperComponent } from '../papers-list/insert-update-paper/insert-update-paper.component';
import { ToastService } from '../../../shared/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { FileService } from '../../services/file-service';
import { Users } from '../../../fds-config/entity-models/user';
import { BooleanInput } from '@angular/cdk/coercion';
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
  isUploading = false;
  users: Users = {} as Users;

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly papersService: PapersService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly confirmationService: ConfirmationService,
    private readonly fileService: FileService,
  ) {}

  ngOnInit(): void {
    const userInfo = this.userInfoService.getUserInfo();
    if (userInfo && userInfo.userId) {
      this.userId = userInfo.userId;
      this.fetchUserProfile();
      this.fetchUserPapers();
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
        // Only show papers belonging to the active logged-in user
        // this.papers = (res.data || []).filter((paper: any) => paper.UserId === this.userId);
        this.papers = res?.data || [];
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

  viewPaper(paper: any): void {
    if (paper.FileUrl) {
      window.open(paper.FileUrl, '_blank');
    } else {
      this.toastService.success(`Viewing paper details: ${paper.Title}`);
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

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const userId = this.userDetailedData?.Id;

    this.imageUpload(userId, file);
  }

  // onFileSelected(event: any): void {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   this.isUploading = true;
  //   this.cdr.markForCheck();
  //   this.toastService.info('Uploading profile photo...', 'Uploading');

  //   this.fileService.uploadFile(file).subscribe({
  //     next: (res: any) => {
  //       const imageUrl = res?.data?.url;
  //       if (imageUrl) {
  //         this.updateProfilePicture(imageUrl);
  //       } else {
  //         this.isUploading = false;
  //         this.cdr.markForCheck();
  //         this.toastService.error('Failed to get uploaded image URL');
  //       }
  //     },
  //     error: (err) => {
  //       this.isUploading = false;
  //       this.cdr.markForCheck();
  //       console.error('Error uploading profile photo:', err);
  //       this.toastService.error('Failed to upload profile photo');
  //     },
  //   });
  // }

  // private updateProfilePicture(imageUrl: string): void {
  //   const updatedUser: Users = {
  //     Id: this.userDetailedData.Id,
  //     Name: this.userDetailedData.Name,
  //     Email: this.userDetailedData.Email,
  //     StudentId: this.userDetailedData.StudentId,
  //     DepartmentId: this.userDetailedData.DepartmentId,
  //     RoleId: this.userDetailedData.RoleId,
  //     BatchId: this.userDetailedData.BatchId,
  //     Password: this.userDetailedData.Password || '',
  //     ImageUrl: imageUrl,
  //   };

  //   this.userInfoService.updateUser(updatedUser).subscribe({
  //     next: () => {
  //       this.toastService.success('Profile picture updated successfully');
  //       this.fetchUserProfile();
  //       this.isUploading = false;
  //       this.cdr.markForCheck();
  //     },
  //     error: (err) => {
  //       this.isUploading = false;
  //       this.cdr.markForCheck();
  //       console.error('Error updating user profile picture:', err);
  //       this.toastService.error('Failed to update profile picture in database');
  //     },
  //   });
  // }
}
