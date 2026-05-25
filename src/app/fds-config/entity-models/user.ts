import { Role } from './role';

export interface Users {
  Id: number;
  Name: string;
  Email: string;
  StudentId: string;
  Password: string;
  DepartmentId: number;
  RoleId?: number | null;
  Roles?: Role | null;
  BatchId?: number | null;
  IsMarkToDelete?: boolean | null;
  CreatedAt?: Date | null;
  UpdatedAt?: Date | null;
}
