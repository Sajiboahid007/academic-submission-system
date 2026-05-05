import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryInsertUpdateComponent } from './components/categories/category-insert-update/category-insert-update.component';
import { SubcategoryListComponent } from './components/subcategory-list/subcategory-list.component';
import { InsertOrUpdateSubcategoryComponent } from './components/subcategory-list/insert-or-update-subcategory/insert-or-update-subcategory.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';
import { InsertUpdateDepartmentComponent } from './components/department-list/insert-update-department/insert-update-department.component';
import { InsertUpdateBatchesComponent } from './components/batch-list/insert-update-batches/insert-update-batches.component';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, CategoriesComponent, CategoryInsertUpdateComponent, SubcategoryListComponent, InsertOrUpdateSubcategoryComponent, UserListComponent, DepartmentListComponent, BatchListComponent, InsertUpdateDepartmentComponent, InsertUpdateBatchesComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [LoginComponent, DashboardComponent, CategoriesComponent, CategoryInsertUpdateComponent, SubcategoryListComponent, InsertOrUpdateSubcategoryComponent, UserListComponent, DepartmentListComponent, BatchListComponent, InsertUpdateDepartmentComponent, InsertUpdateBatchesComponent],
})
export class AdminModule { }
