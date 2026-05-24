import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PapersService } from '../../services/papers-service';
import { Papers } from '../../../fds-config/entity-models/papers';
import { AppQuery } from '../../../shared/app-query';
import { MatDialog } from '@angular/material/dialog';
import { InsertUpdatePaperComponent } from './insert-update-paper/insert-update-paper.component';
import { Category } from '../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../fds-config/entity-models/subcategory';
import { Department } from '../../../fds-config/entity-models/department';
import { Batches } from '../../../fds-config/entity-models/batch';
import { CategoriesService } from '../../services/categories-service';
import { SubcategoryService } from '../../services/subcategory-service';
import { DepartmentService } from '../../services/department-service';
import { BatchService } from '../../services/batch-service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-papers-list',
  standalone: false,
  templateUrl: './papers-list.component.html',
  styleUrl: './papers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapersListComponent implements OnInit {
  papers: Papers[] = [];
  loading: boolean = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  departments: Department[] = [];
  batches: Batches[] = [];
  years: string[] = [];
  searchValue = '';

  constructor(
    private readonly papersService: PapersService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubcategoryService,
    private readonly departmentService: DepartmentService,
    private readonly batchService: BatchService,
  ) {}

  ngOnInit(): void {
    this.getPapers();
    this.getCategory();
    this.getSubCategory();
    this.getDepartment();
    this.getBatch();
  }

  getPapers() {
    this.papersService.getPapers().subscribe((res: AppQuery<Papers[]>) => {
      this.papers = res.data;
      this.years = Array.from(
        new Set(this.papers.map((paper) => paper.Year).filter((year): year is string => !!year)),
      ).sort();
      this.cdr.markForCheck();
    });
  }
  getCategory() {
    this.categoryService.getCategories().subscribe((res: AppQuery<Category[]>) => {
      this.categories = res.data;
      this.cdr.markForCheck();
    });
  }
  getSubCategory() {
    this.subCategoryService.getSubcategories().subscribe((res: AppQuery<SubCategory[]>) => {
      this.subCategories = res.data;
      this.cdr.markForCheck();
    });
  }
  getDepartment() {
    this.departmentService.getDepartments().subscribe((res: AppQuery<Department[]>) => {
      this.departments = res.data;
      this.cdr.markForCheck();
    });
  }
  getBatch() {
    this.batchService.getBatches().subscribe((res: AppQuery<Batches[]>) => {
      this.batches = res.data;
      this.cdr.markForCheck();
    });
  }

  AddPapers() {
    const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
      width: '800px',
      height: '650px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPapers();
      }
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
}
