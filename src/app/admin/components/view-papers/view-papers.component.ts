import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../../services/journal-service';
import { PapersService } from '../../services/papers-service';
import { DepartmentService } from '../../services/department-service';
import { UserInfoService } from '../../services/user-info-service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';

import { Location } from '@angular/common';

import { PaperGroup } from '../../services/paper-group';

@Component({
  selector: 'app-view-papers',
  standalone: false,
  templateUrl: './view-papers.component.html',
  styleUrl: './view-papers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPapersComponent implements OnInit {
  id: number | null = null;
  type: 'journal' | 'paper' = 'journal';
  from: string | null = null;
  item: any = null;
  groupTeachers: any[] = [];
  loading: boolean = true;
  activeTab: string = 'details';

  departmentsMap = new Map<number, any>();
  usersMap = new Map<number, any>();

  // Mock / stat indicators matching reference design
  viewsCount: number = 759;
  downloadsCount: number = 595;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly journalService: JournalService,
    private readonly papersService: PapersService,
    private readonly departmentService: DepartmentService,
    private readonly userInfoService: UserInfoService,
    private readonly paperGroupService: PaperGroup,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getUsers();

    this.route.queryParams.subscribe((params) => {
      this.id = Number(params['id']) || null;
      this.type = (params['type'] === 'paper' ? 'paper' : 'journal');
      this.from = params['from'] || null;

      if (this.id) {
        this.loadDetails();
      } else {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res) => {
        const list = res?.data || [];
        list.forEach((d: any) => {
          if (d?.Id) this.departmentsMap.set(Number(d.Id), d);
        });
        this.cdr.markForCheck();
      },
    });
  }

  getUsers() {
    this.userInfoService.getUsers().subscribe({
      next: (res) => {
        const list = res?.data || [];
        list.forEach((u: any) => {
          if (u?.Id) this.usersMap.set(Number(u.Id), u);
        });
        this.cdr.markForCheck();
      },
    });
  }

  loadDetails() {
    this.loading = true;
    this.cdr.markForCheck();

    this.fetchGroupMembers();

    if (this.type === 'journal') {
      this.journalService.getById(this.id!).subscribe({
        next: (res) => {
          this.item = res?.data;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error loading journal details:', err);
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
    } else {
      this.papersService.getPaperById(this.id!).subscribe({
        next: (res) => {
          this.item = res?.data;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error loading paper details:', err);
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
    }
  }

  fetchGroupMembers() {
    if (!this.id) return;

    const obs$ =
      this.type === 'journal'
        ? this.paperGroupService.getGroupPapersWithJournalId(this.id)
        : this.paperGroupService.getGroupPapersWithPaperId(this.id);

    obs$.subscribe({
      next: (res: any) => {
        this.groupTeachers = res?.data?.teachers || res?.data?.allMembers || [];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching paper group members:', err);
      },
    });
  }

  getAuthorsList(): any[] {
    const authors: any[] = [];
    const addedUserIds = new Set<number>();
    const addedNames = new Set<string>();

    const addAuthor = (userId: number | null, rawName: string, deptName?: string, rawImg?: string) => {
      let uMap = userId ? this.usersMap.get(Number(userId)) : null;

      // If user not found by ID, search usersMap by Name
      if (!uMap && rawName) {
        const targetName = rawName.trim().toLowerCase();
        for (const u of this.usersMap.values()) {
          if (u?.Name && u.Name.trim().toLowerCase() === targetName) {
            uMap = u;
            break;
          }
        }
      }

      const name = rawName || uMap?.Name || 'Unknown Author';
      const cleanNameKey = name.trim().toLowerCase();

      const uId = uMap?.Id || userId;
      if (uId && addedUserIds.has(Number(uId))) return;
      if (!uId && addedNames.has(cleanNameKey)) return;

      if (uId) addedUserIds.add(Number(uId));
      addedNames.add(cleanNameKey);

      let img = rawImg || uMap?.ImageUrl || uMap?.Image;
      if (img && !img.startsWith('http') && !img.startsWith('data:')) {
        img = img.startsWith('/')
          ? `${AcademicSubmissionConfig.BaseUrl}${img}`
          : `${AcademicSubmissionConfig.BaseUrl}/${img}`;
      }

      let dept =
        deptName ||
        uMap?.Department?.Name ||
        (typeof uMap?.Department === 'string' ? uMap.Department : null) ||
        (uMap?.DepartmentId && this.departmentsMap.get(Number(uMap.DepartmentId))?.Name) ||
        this.item?.Department?.Name ||
        '';

      authors.push({
        id: uId,
        name: name,
        department: dept,
        imageUrl: img || '',
      });
    };

    // 1. From groupTeachers (retrieved via PaperGroup service)
    const teachersList = this.groupTeachers || [];
    teachersList.forEach((t: any) => {
      const userType = t?.UserType;
      const roleName = t?.Roles?.Name || t?.Users?.Roles?.Name;
      if (userType === 'Reviewer' || roleName === 'Reviewer') return;

      const tUserId = t?.UserId || t?.UsersId || t?.Id;
      const tName = t?.Name || t?.Users?.Name;
      const tDept =
        t?.Department?.Name ||
        t?.Users?.Department?.Name ||
        (typeof t?.Department === 'string' ? t.Department : null);
      const tImg = t?.ImageUrl || t?.Image || t?.Users?.ImageUrl;

      addAuthor(tUserId ? Number(tUserId) : null, tName, tDept, tImg);
    });

    // 2. From PaperGroups (filtering out Reviewers)
    const groups = this.item?.PaperGroups || [];
    groups.forEach((g: any) => {
      const userType = g?.UserType;
      const roleName = g?.Users?.Roles?.Name || g?.User?.Roles?.Name;
      if (userType === 'Reviewer' || roleName === 'Reviewer') return;

      const gUserId = g?.UserId || g?.UsersId || g?.Users?.Id || g?.User?.Id;
      const gName = g?.Users?.Name || g?.User?.Name || g?.Name;
      const gDept =
        g?.Users?.Department?.Name ||
        g?.User?.Department?.Name ||
        g?.Department?.Name ||
        (typeof g?.Users?.Department === 'string' ? g.Users.Department : null);
      const gImg = g?.Users?.ImageUrl || g?.User?.ImageUrl || g?.ImageUrl;

      addAuthor(gUserId ? Number(gUserId) : null, gName, gDept, gImg);
    });

    // 3. From item.UserId / item.Users
    if (this.item?.UserId || this.item?.Users) {
      const uId = this.item?.UserId || this.item?.Users?.Id;
      const uName = this.item?.Users?.Name;
      const uDept = this.item?.Users?.Department?.Name || this.item?.Department?.Name;
      const uImg = this.item?.Users?.ImageUrl;
      addAuthor(uId ? Number(uId) : null, uName, uDept, uImg);
    }

    // 4. From item.Authors string fallback
    if (this.item?.Authors) {
      const names = this.item.Authors.split(',');
      names.forEach((n: string) => {
        const trimmed = n.trim();
        if (trimmed) {
          addAuthor(null, trimmed);
        }
      });
    }

    return authors;
  }

  getKeywordsList(): string[] {
    const kStr = this.item?.Keywords || '';
    if (!kStr) return [];
    return kStr.split(',').map((k: string) => k.trim()).filter(Boolean);
  }

  getPublicationDate(): string {
    if (this.item?.CreatedDate) {
      return new Date(this.item.CreatedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (this.item?.Year) {
      return `Year ${this.item.Year}`;
    }
    return 'N/A';
  }

  getIssueString(): string {
    const vol = this.item?.Volume ? `Vol. ${this.item.Volume}` : '';
    const issue = this.item?.IssueNumber ? `No. ${this.item.IssueNumber}` : '';
    const yr = this.item?.Year ? `(${this.item.Year})` : '';

    const parts = [vol, issue, yr].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  }

  getDoi(): string {
    return this.item?.DOI || '10.18535/sshj.v10i01.2178';
  }

  downloadPdf() {
    if (!this.item?.FileUrl) return;
    window.open(this.item.FileUrl, '_blank');
  }

  goBack() {
    this.location.back();
  }
}

