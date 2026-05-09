import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from '../../../fds-config/entity-models/user';
import { UserInfoService } from '../../services/user-info-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertUpdateUserComponent } from './insert-update-user/insert-update-user.component';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  dataSource = new MatTableDataSource<Users>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private dialogRef!: MatDialogRef<any>;
  @ViewChild('userModal') userModal!: TemplateRef<any>;

  userEditId: number = 0;

  constructor(
    private readonly usersService: UserInfoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(InsertUpdateUserComponent, {
      width: '500px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  openAddModal(isEdit: boolean = false): void {
    if (!isEdit) {
      this.userEditId = 0;
    }
    this.dialogRef = this.dialog.open(this.userModal, {
      width: '600px',
      disableClose: false,
      autoFocus: false,
      data: { id: this.userEditId },
    });
  }

  onEditUser(user: Users) {}

  onDeleteUser(user: Users) {}

  displayedColumns = ['Name', 'Email', 'Role', 'Department', 'Actions'];
}
