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

@NgModule({
  declarations: [LoginComponent, DashboardComponent, CategoriesComponent, CategoryInsertUpdateComponent, SubcategoryListComponent, InsertOrUpdateSubcategoryComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [LoginComponent, DashboardComponent, CategoriesComponent, CategoryInsertUpdateComponent, SubcategoryListComponent, InsertOrUpdateSubcategoryComponent],
})
export class AdminModule { }
