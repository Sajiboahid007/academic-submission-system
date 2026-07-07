import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home-service';
import { JournalService } from '../../services/journal-service';
import { UserInfoService } from '../../services/user-info-service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { Category } from '../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../fds-config/entity-models/subcategory';
import { Journals } from '../../../fds-config/entity-models/journals';

@Component({
  selector: 'home',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {

  // Raw data
  allPapers: any[] = [];
  journals: Journals[] = [];
  category: Category[] = [];
  subCategory: SubCategory[] = [];
  department: any[] = [];

  // Unified list + filtered/paged views
  allCombinedItems: any[] = [];
  filteredItems: any[] = [];
  pagedItems: any[] = [];
  pagedData: any[] = [];
  pagedPapers: any[] = [];

  selectedBrowse: string = 'Journals';

  selectedCategoryId: number | null = null;
  selectedSubCategoryId: number | null = null;
  selectedDepartmentId: number | null = null;
  expandedCategories: { [id: number]: boolean } = {};

  searchQuery: string = '';
  journalAuthor: string = '';
  journalKeyword: string = '';

  // Auth
  isLoggedIn: boolean = false;
  currentUser: any = null;

  // Sidebar visibility
  sidebarVisible: boolean = true;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 6;

  constructor(
    private readonly homeService: HomeService,
    private readonly journalService: JournalService,
    private readonly userInfoService: UserInfoService,
    private readonly localStorage: LocalStorageService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadAllData();
  }

  checkAuthentication() {
    const userInfo = this.userInfoService.getUserInfo();
    this.isLoggedIn = !!userInfo;
    this.currentUser = userInfo ?? null;
  }

  loadAllData() {
    this.homeService.getCategory().subscribe({
      next: (res) => { this.category = res?.data || []; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });

    this.homeService.getSubCategory().subscribe({
      next: (res) => { this.subCategory = res?.data || []; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });

    this.homeService.getDepartment().subscribe({
      next: (res) => { this.department = res?.data || []; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });

    // Load papers then journals
    this.homeService.getAllPapers().subscribe({
      next: (res: any) => {
        const responseData = res?.data;
        if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
          // If backend returns the combined object { journals, papers }
          this.allPapers = responseData.papers || [];
          this.journals = responseData.journals || [];
          this.buildCombinedList();
        } else {
          // Fallback if it is a flat array
          this.allPapers = Array.isArray(responseData) ? responseData : [];
          this.loadJournals();
        }
      },
      error: () => {
        this.homeService.getPapers().subscribe({
          next: (res: any) => {
            this.allPapers = res?.data || [];
            this.loadJournals();
          },
          error: () => {
            this.allPapers = [];
            this.loadJournals();
          }
        });
      }
    });
  }

  loadJournals() {
    this.homeService.getJournals().subscribe({
      next: (res) => {
        this.journals = res?.data || [];
        this.buildCombinedList();
      },
      error: () => {
        this.buildCombinedList();
      }
    });
  }

  buildCombinedList() {
    const combined: any[] = [];

    this.journals.forEach(j => {
      combined.push({
        ...j,
        itemType: 'JOURNAL',
        AuthorsList: j.Authors ? j.Authors.split(',').map((a: string) => a.trim()) : [],
        DisplayCategory: (j as any).Category?.Name || 'Journal',
        DisplaySubCategory: (j as any).SubCategory?.Name || '',
        DisplayTitle: j.Title,
        DisplayAbstract: (j as any).Abstract || 'No abstract available.',
        FormattedDate: (j as any).CreatedDate ? new Date((j as any).CreatedDate) : null,
        KeywordsList: j.Keywords ? j.Keywords.split(',').map((k: string) => k.trim()) : []
      });
    });

    this.allPapers.forEach(p => {
      combined.push({
        ...p,
        itemType: 'PAPER',
        AuthorsList: [p.CreatedBy || 'Academic Author'],
        DisplayCategory: p.Category?.Name || 'Academic Paper',
        DisplaySubCategory: p.SubCategory?.Name || '',
        DisplayTitle: p.Title,
        DisplayAbstract: p.Abstract || 'No abstract available.',
        FormattedDate: p.CreatedDate ? new Date(p.CreatedDate) : null,
        KeywordsList: []
      });
    });

    combined.sort((a, b) => {
      const dA = a.FormattedDate?.getTime() ?? 0;
      const dB = b.FormattedDate?.getTime() ?? 0;
      return dB - dA;
    });

    this.allCombinedItems = combined;
    this.applyFilters();
  }


  selectBrowseType(type: string) {
    this.selectedBrowse = type;
    // Reset category/subcategory/department when switching browse
    this.selectedCategoryId = null;
    this.selectedSubCategoryId = null;
    this.selectedDepartmentId = null;
    this.searchQuery = '';
    this.journalAuthor = '';
    this.journalKeyword = '';
    this.applyFilters();
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
    this.selectedSubCategoryId = null;
    this.selectedDepartmentId = null; // Clear department to avoid conflict
    this.applyFilters();
  }

  selectSubCategory(subCategoryId: number, event: Event) {
    event.stopPropagation();
    this.selectedSubCategoryId = this.selectedSubCategoryId === subCategoryId ? null : subCategoryId;
    this.selectedDepartmentId = null; // Clear department to avoid conflict
    this.applyFilters();
  }

  selectDepartment(departmentId: number) {
    this.selectedDepartmentId = this.selectedDepartmentId === departmentId ? null : departmentId;
    this.selectedCategoryId = null; // Clear category to avoid conflict
    this.selectedSubCategoryId = null;
    this.applyFilters();
  }

  toggleCategoryExpand(categoryId: number, event: Event) {
    event.stopPropagation();
    this.expandedCategories[categoryId] = !this.expandedCategories[categoryId];
    this.cdr.markForCheck();
  }

  toggleSidebarCollapse() {
    this.sidebarVisible = !this.sidebarVisible;
    this.cdr.markForCheck();
  }

  applyFilters() {
    let items = [...this.allCombinedItems];

    if (this.selectedBrowse === 'Journals') {
      items = items.filter(i => i.itemType === 'JOURNAL');
    } else if (this.selectedBrowse === 'Papers') {
      items = items.filter(i => i.itemType === 'PAPER');
    }

    if (this.selectedCategoryId !== null) {
      items = items.filter(i => i.CategoryId === this.selectedCategoryId);
    }

    if (this.selectedSubCategoryId !== null) {
      items = items.filter(i => i.SubcategoryId === this.selectedSubCategoryId);
    }

    if (this.selectedDepartmentId !== null) {
      items = items.filter(i => i.DepartmentId === this.selectedDepartmentId);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      items = items.filter(i =>
        i.DisplayTitle?.toLowerCase().includes(q) ||
        i.DisplayAbstract?.toLowerCase().includes(q) ||
        i.KeywordsList?.some((k: string) => k.toLowerCase().includes(q)) ||
        i.Authors?.toLowerCase().includes(q)
      );
    }

    if (this.selectedBrowse === 'Journals') {
      if (this.journalAuthor.trim()) {
        const a = this.journalAuthor.toLowerCase().trim();
        items = items.filter(i => i.Authors?.toLowerCase().includes(a));
      }
      if (this.journalKeyword.trim()) {
        const k = this.journalKeyword.toLowerCase().trim();
        items = items.filter(i => i.Keywords?.toLowerCase().includes(k));
      }
    }

    this.filteredItems = items;
    this.currentPage = 1;
    this.updatePagedItems();
  }

  updatePagedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedItems = this.filteredItems.slice(start, start + this.pageSize);

    if (this.selectedBrowse === 'Journals') {
      this.pagedData = this.pagedItems;
      this.pagedPapers = [];
    } else if (this.selectedBrowse === 'Papers') {
      this.pagedPapers = this.pagedItems;
      this.pagedData = [];
    } else {
      this.pagedData = [];
      this.pagedPapers = [];
    }

    this.cdr.markForCheck();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.pageSize) || 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedItems();
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedItems();
      this.scrollToTop();
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedItems();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    const element = document.querySelector('.main-portal-content');
    if (element) {
      element.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getCategoryCount(categoryId: number): number {
    const base = this.selectedBrowse === 'Journals'
      ? this.allCombinedItems.filter(i => i.itemType === 'JOURNAL')
      : this.selectedBrowse === 'Papers'
        ? this.allCombinedItems.filter(i => i.itemType === 'PAPER')
        : this.allCombinedItems;
    return base.filter(i => i.CategoryId === categoryId).length;
  }

  getDepartmentCount(departmentId: number): number {
    const base = this.selectedBrowse === 'Journals'
      ? this.allCombinedItems.filter(i => i.itemType === 'JOURNAL')
      : this.selectedBrowse === 'Papers'
        ? this.allCombinedItems.filter(i => i.itemType === 'PAPER')
        : this.allCombinedItems;
    return base.filter(i => i.DepartmentId === departmentId).length;
  }

  getSubCategoriesForCategory(categoryId: number): SubCategory[] {
    return this.subCategory.filter(sc => sc.CategoryId === categoryId && !sc.IsMarkToDelete);
  }


  viewItem(item: any) {
    if (item.itemType === 'JOURNAL') {
      this.viewJournal(item.Id);
    } else {
      this.viewPaper(item.Id);
    }
  }

  viewPaper(id: number) {
    const paper = this.allPapers.find(p => p.Id === id);
    if (paper?.FileUrl) {
      window.open(paper.FileUrl, '_blank');
    } else {
      this.toastService.warn('No PDF file found for this paper.');
    }
  }

  viewJournal(id: number) {
    const journal = this.journals.find(j => j.Id === id);
    if (journal?.FileUrl) {
      window.open(journal.FileUrl, '_blank');
    } else {
      this.toastService.warn('No PDF file found for this journal.');
    }
  }

  submitPaper() {
    this.toastService.info("Please login to submit a paper")
  }

  login() { this.router.navigate(['/login']); }

  logout() {
    this.localStorage.removeItem(AcademicSubmissionConfig.JwtTokenKey);
    this.localStorage.removeItem(AcademicSubmissionConfig.RefreshTokenKey);
    this.isLoggedIn = false;
    this.currentUser = null;
    this.toastService.success('Logged out successfully.');
    this.cdr.markForCheck();
  }

  getSeverity(status: string): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    switch (status?.toLowerCase()) {
      case 'approved': return 'success';
      case 'pending': return 'warn';
      case 'rejected': return 'danger';
      case 'draft': return 'secondary';
      default: return 'info';
    }
  }


}
