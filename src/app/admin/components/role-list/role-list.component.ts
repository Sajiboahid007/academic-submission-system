import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../fds-config/entity-models/role';
import { RoleService } from '../../services/role-service';

@Component({
  selector: 'app-role-list',
  standalone: false,
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {

  roles: Role[] = [];

  constructor(private readonly roleService: RoleService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data;
        this.cdr.markForCheck();
      },
    });
  }

  AddRole(): void {
  }

  onEditRole(id: number): void {
  }

  onDeleteRole(id: number): void {

  }

}
