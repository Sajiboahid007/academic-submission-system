import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from '../../../fds-config/entity-models/user';
import { UserInfoService } from '../../services/user-info-service';

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

  constructor(private readonly usersService: UserInfoService) {}

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

  AddUser() {}

  onEditUser(user: Users) {}

  onDeleteUser(user: Users) {}

  displayedColumns = ['Name', 'Email', 'Role', 'Department', 'Actions'];
}
