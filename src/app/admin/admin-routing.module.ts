import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SubcategoryListComponent } from './components/subcategory-list/subcategory-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RoleListComponent } from './components/role-list/role-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'subcategory',
        component: SubcategoryListComponent,
      },
      {
        path: 'user',
        component: UserListComponent,
      },
      {
        path: 'department',
        component: DepartmentListComponent,
      },
      {
        path: 'batch',
        component: BatchListComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'role',
        component: RoleListComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
