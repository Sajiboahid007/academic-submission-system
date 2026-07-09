import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
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
import { PaperApprovalConfirmationComponent } from '../../../shared/components/paper-approval-confirmation/paper-approval-confirmation.component';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { Journals } from '../../../fds-config/entity-models/journals';
import { JournalService } from '../../services/journal-service';

@Component({
  selector: 'app-papers-list',
  standalone: false,
  templateUrl: './papers-list.component.html',
  styleUrl: './papers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapersListComponent implements OnInit {
  papers: Papers[] = [];
  journal: Journals[] = []
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
    private readonly toastService: ToastService,
    private readonly journalService: JournalService
  ) { }

  ngOnInit(): void {
    this.getPapers();
    this.getJournal()
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

  print() {
    const printSection = document.getElementById('printSection');
    if (printSection) {
      const originalContents = document.body.innerHTML;
      const printContents = printSection.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  }

  exportPapersReport() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const totalCount = this.papers.length;
    const approvedCount = this.papers.filter((p: any) => p.PaperApprovals?.[0]?.Status === 'Approved').length;
    const pendingCount = this.papers.filter((p: any) => p.PaperApprovals?.[0]?.Status === 'Pending' || p.PaperApprovals?.[0]?.Status === 'Review Requested').length;
    const draftCount = totalCount - approvedCount - pendingCount;

    // Helper: draw page header
    const drawPageHeader = (pageNumber: number) => {
      // Top color banner
      doc.setFillColor(30, 41, 59); // #1e293b
      doc.rect(0, 0, 210, 15, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text('GONO UNIVERSITY RESEARCH PORTAL', 15, 9.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('OFFICIAL RECORD ARCHIVE', 195, 9.5, { align: 'right' });

      // Title & Date
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // #0f172a
      doc.text('Academic Papers Inventory Report', 15, 28);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // #64748b
      const dateStr = new Date().toLocaleString();
      doc.text(`Report Generated: ${dateStr} | Records Count: ${totalCount} items`, 15, 33);

      // Horizontal line
      doc.setDrawColor(226, 232, 240); // #e2e8f0
      doc.setLineWidth(0.5);
      doc.line(15, 36, 195, 36);
    };

    // Draw First Page Header
    drawPageHeader(1);

    let y = 42;

    // Statistics Cards
    const cardW = 40;
    const cardH = 15;
    const gap = 6;
    const startX = 15;

    const stats = [
      { label: 'Total Papers', value: totalCount, color: [30, 41, 59] },
      { label: 'Approved', value: approvedCount, color: [22, 163, 74] },
      { label: 'Pending / Review', value: pendingCount, color: [217, 119, 6] },
      { label: 'Draft / Other', value: draftCount, color: [71, 85, 105] }
    ];

    stats.forEach((stat, i) => {
      const cx = startX + i * (cardW + gap);
      // Background card
      doc.setFillColor(248, 250, 252); // #f8fafc
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.roundedRect(cx, y, cardW, cardH, 2, 2, 'FD');

      // Value bar indicator (left-side colored line)
      doc.setFillColor(stat.color[0], stat.color[1], stat.color[2]);
      doc.rect(cx, y, 1.5, cardH, 'F');

      // Label text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(stat.label, cx + 4, y + 5);

      // Value text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(String(stat.value), cx + 4, y + 11);
    });

    y += 22; // Move y past stats cards

    // Table Setup
    const colWidths = [10, 80, 30, 32, 13, 15]; // Total = 180mm
    const colAlign = ['center', 'left', 'left', 'left', 'center', 'center'];
    const headers = ['#', 'Title & Abstract', 'Category', 'Department / Batch', 'Year', 'Status'];

    const drawTableHeaders = (currentY: number) => {
      doc.setFillColor(241, 245, 249); // #f1f5f9
      doc.rect(15, currentY, 180, 8, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105); // #475569

      let curX = 15;
      headers.forEach((h, idx) => {
        const w = colWidths[idx];
        let textX = curX + 2;
        if (colAlign[idx] === 'center') textX = curX + w / 2;
        doc.text(h, textX, currentY + 5.5, {
          align: colAlign[idx] as 'left' | 'center' | 'right'
        });
        curX += w;
      });

      doc.setDrawColor(203, 213, 225); // #cbd5e1
      doc.setLineWidth(0.4);
      doc.line(15, currentY + 8, 195, currentY + 8);
    };

    drawTableHeaders(y);
    y += 8;

    let pageNum = 1;

    // Draw Footer Helper
    const drawFooter = (pNum: number) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // #94a3b8
      doc.text(`Gono University Academic Submission Repository  |  Confidential Internal Use Only`, 15, 287);
      doc.text(`Page ${pNum}`, 195, 287, { align: 'right' });
    };

    this.papers.forEach((paper: any, idx) => {
      const title = paper.Title || 'No Title';
      const abstract = paper.Abstract || 'No Abstract/Description provided.';
      const category = paper.Category?.Name || '-';
      const subCategory = paper.SubCategory?.Name ? `(${paper.SubCategory.Name})` : '';
      const dept = paper.Department?.Name || '-';
      const batch = paper.Batches?.Name ? `[Batch: ${paper.Batches.Name}]` : '';
      const year = String(paper.Year || '-');
      const status = paper.PaperApprovals?.[0]?.Status || 'Draft';

      // Split multiline content
      const titleLines = doc.splitTextToSize(title, colWidths[1] - 4);
      const abstractLines = doc.splitTextToSize(abstract, colWidths[1] - 4).slice(0, 2); // limit abstract to 2 lines
      const categoryLines = doc.splitTextToSize(`${category} ${subCategory}`, colWidths[2] - 4);
      const deptLines = doc.splitTextToSize(`${dept} ${batch}`, colWidths[3] - 4);

      // Compute row height based on content
      const contentLinesCount = titleLines.length + abstractLines.length + 1; // 1 extra spacer line between title and abstract
      const catLinesCount = categoryLines.length;
      const dLinesCount = deptLines.length;

      const maxLines = Math.max(contentLinesCount, catLinesCount, dLinesCount);
      const rowHeight = Math.max(maxLines * 4.2 + 4, 12); // minimum height

      // Check page break
      if (y + rowHeight > 270) {
        drawFooter(pageNum);
        doc.addPage();
        pageNum++;
        drawPageHeader(pageNum);
        y = 42;
        drawTableHeaders(y);
        y += 8;
      }

      // Alternating row backgrounds
      if (idx % 2 === 1) {
        doc.setFillColor(248, 250, 252); // #f8fafc
        doc.rect(15, y, 180, rowHeight, 'F');
      }

      // Draw horizontal line at bottom
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(15, y + rowHeight, 195, y + rowHeight);

      // Render columns
      let curX = 15;

      // Col 0: Index
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(String(idx + 1), curX + colWidths[0] / 2, y + 5, { align: 'center' });
      curX += colWidths[0];

      // Col 1: Title & Abstract
      let titleY = y + 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      titleLines.forEach((line: any) => {
        doc.text(line, curX + 2, titleY);
        titleY += 4;
      });

      titleY += 0.5; // space before abstract
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      abstractLines.forEach((line: any) => {
        doc.text(line, curX + 2, titleY);
        titleY += 3.8;
      });
      curX += colWidths[1];

      // Col 2: Category
      let catY = y + 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      categoryLines.forEach((line: any) => {
        doc.text(line, curX + 2, catY);
        catY += 4;
      });
      curX += colWidths[2];

      // Col 3: Department / Batch
      let deptY = y + 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      deptLines.forEach((line: any) => {
        doc.text(line, curX + 2, deptY);
        deptY += 4;
      });
      curX += colWidths[3];

      // Col 4: Year
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      doc.text(year, curX + colWidths[4] / 2, y + 5, { align: 'center' });
      curX += colWidths[4];

      // Col 5: Status Badge
      const statusW = colWidths[5] - 2;
      const statusH = 5;
      const badgeX = curX + (colWidths[5] - statusW) / 2;
      const badgeY = y + 2;

      let badgeColor = [71, 85, 105]; // Slate
      if (status === 'Approved' || status === 'Editorial Approved') badgeColor = [22, 163, 74]; // Green
      else if (status === 'Pending' || status === 'Review Requested') badgeColor = [217, 119, 6]; // Amber
      else if (status === 'Rejected') badgeColor = [220, 38, 38]; // Red

      doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
      doc.roundedRect(badgeX, badgeY, statusW, statusH, 1, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(status.toUpperCase(), badgeX + statusW / 2, badgeY + 3.6, { align: 'center' });

      y += rowHeight;
    });

    // Final Page Footer
    drawFooter(pageNum);

    doc.save('Academic_Papers_Report.pdf');
    this.toastService.success('Academic Papers Report PDF generated successfully!');
  }

  exportJournalsReport() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const totalCount = this.journal.length;
    const approvedCount = this.journal.filter((j: any) => j.PaperApprovals?.[0]?.Status === 'Approved').length;
    const pendingCount = this.journal.filter((j: any) => j.PaperApprovals?.[0]?.Status === 'Pending' || j.PaperApprovals?.[0]?.Status === 'Review Requested').length;
    const draftCount = totalCount - approvedCount - pendingCount;

    // Helper: draw page header
    const drawPageHeader = (pageNumber: number) => {
      // Top color banner
      doc.setFillColor(30, 41, 59); // #1e293b
      doc.rect(0, 0, 210, 15, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text('GONO UNIVERSITY RESEARCH PORTAL', 15, 9.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('OFFICIAL RECORD ARCHIVE', 195, 9.5, { align: 'right' });

      // Title & Date
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // #0f172a
      doc.text('Journal Publications Inventory Report', 15, 28);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // #64748b
      const dateStr = new Date().toLocaleString();
      doc.text(`Report Generated: ${dateStr} | Records Count: ${totalCount} items`, 15, 33);

      // Horizontal line
      doc.setDrawColor(226, 232, 240); // #e2e8f0
      doc.setLineWidth(0.5);
      doc.line(15, 36, 195, 36);
    };

    // Draw First Page Header
    drawPageHeader(1);

    let y = 42;

    // Statistics Cards
    const cardW = 40;
    const cardH = 15;
    const gap = 6;
    const startX = 15;

    const stats = [
      { label: 'Total Journals', value: totalCount, color: [30, 41, 59] },
      { label: 'Approved', value: approvedCount, color: [22, 163, 74] },
      { label: 'Pending / Review', value: pendingCount, color: [217, 119, 6] },
      { label: 'Draft / Other', value: draftCount, color: [71, 85, 105] }
    ];

    stats.forEach((stat, i) => {
      const cx = startX + i * (cardW + gap);
      // Background card
      doc.setFillColor(248, 250, 252); // #f8fafc
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.roundedRect(cx, y, cardW, cardH, 2, 2, 'FD');

      // Value bar indicator (left-side colored line)
      doc.setFillColor(stat.color[0], stat.color[1], stat.color[2]);
      doc.rect(cx, y, 1.5, cardH, 'F');

      // Label text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(stat.label, cx + 4, y + 5);

      // Value text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(String(stat.value), cx + 4, y + 11);
    });

    y += 22; // Move y past stats cards

    // Table Setup
    const colWidths = [10, 72, 28, 42, 13, 15]; // Total = 180mm
    const colAlign = ['center', 'left', 'left', 'left', 'center', 'center'];
    const headers = ['#', 'Title & Authors', 'Category', 'Journal Name & Volume', 'Year', 'Status'];

    const drawTableHeaders = (currentY: number) => {
      doc.setFillColor(241, 245, 249); // #f1f5f9
      doc.rect(15, currentY, 180, 8, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105); // #475569

      let curX = 15;
      headers.forEach((h, idx) => {
        const w = colWidths[idx];
        let textX = curX + 2;
        if (colAlign[idx] === 'center') textX = curX + w / 2;
        doc.text(h, textX, currentY + 5.5, {
          align: colAlign[idx] as 'left' | 'center' | 'right'
        });
        curX += w;
      });

      doc.setDrawColor(203, 213, 225); // #cbd5e1
      doc.setLineWidth(0.4);
      doc.line(15, currentY + 8, 195, currentY + 8);
    };

    drawTableHeaders(y);
    y += 8;

    let pageNum = 1;

    // Draw Footer Helper
    const drawFooter = (pNum: number) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // #94a3b8
      doc.text(`Gono University Academic Submission Repository  | dev - Sajib and Team`, 15, 287);
      doc.text(`Page ${pNum}`, 195, 287, { align: 'right' });
    };

    this.journal.forEach((j: any, idx: any) => {
      const title = j.Title || 'No Title';
      const authors = j.Authors || 'No Authors Specified';
      const category = j.Category?.Name || '-';
      const subCategory = j.SubCategory?.Name ? `(${j.SubCategory.Name})` : '';
      const name = j.Name || 'General Journal';
      const volumeInfo = [
        j.Volume ? `Vol: ${j.Volume}` : '',
        j.IssueNumber ? `Issue: ${j.IssueNumber}` : ''
      ].filter(Boolean).join(', ');

      const year = String(j.Year || '-');
      const status = j.PaperApprovals?.[0]?.Status || 'Draft';

      // Split multiline content
      const titleLines = doc.splitTextToSize(title, colWidths[1] - 4);
      const authorLines = doc.splitTextToSize(`Authors: ${authors}`, colWidths[1] - 4);
      const categoryLines = doc.splitTextToSize(`${category} ${subCategory}`, colWidths[2] - 4);
      const journalLines = doc.splitTextToSize(`${name} ${volumeInfo ? '\n(' + volumeInfo + ')' : ''}`, colWidths[3] - 4);

      // Compute row height based on content
      const contentLinesCount = titleLines.length + authorLines.length + 1; // 1 extra spacer line between title and authors
      const catLinesCount = categoryLines.length;
      const jLinesCount = journalLines.length;

      const maxLines = Math.max(contentLinesCount, catLinesCount, jLinesCount);
      const rowHeight = Math.max(maxLines * 4.2 + 4, 12); // minimum height

      // Check page break
      if (y + rowHeight > 270) {
        drawFooter(pageNum);
        doc.addPage();
        pageNum++;
        drawPageHeader(pageNum);
        y = 42;
        drawTableHeaders(y);
        y += 8;
      }

      // Alternating row backgrounds
      if (idx % 2 === 1) {
        doc.setFillColor(248, 250, 252); // #f8fafc
        doc.rect(15, y, 180, rowHeight, 'F');
      }

      // Draw horizontal line at bottom
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(15, y + rowHeight, 195, y + rowHeight);

      // Render columns
      let curX = 15;

      // Col 0: Index
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(String(idx + 1), curX + colWidths[0] / 2, y + 5, { align: 'center' });
      curX += colWidths[0];

      // Col 1: Title & Authors
      let titleY = y + 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      titleLines.forEach((line: any) => {
        doc.text(line, curX + 2, titleY);
        titleY += 4;
      });

      titleY += 0.5; // space before authors
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      authorLines.forEach((line: any) => {
        doc.text(line, curX + 2, titleY);
        titleY += 3.8;
      });
      curX += colWidths[1];

      // Col 2: Category
      let catY = y + 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      categoryLines.forEach((line: any) => {
        doc.text(line, curX + 2, catY);
        catY += 4;
      });
      curX += colWidths[2];

      // Col 3: Journal Name & Volume
      let journalY = y + 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      journalLines.forEach((line: any) => {
        doc.text(line, curX + 2, journalY);
        journalY += 4;
      });
      curX += colWidths[3];

      // Col 4: Year
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      doc.text(year, curX + colWidths[4] / 2, y + 5, { align: 'center' });
      curX += colWidths[4];

      // Col 5: Status Badge
      const statusW = colWidths[5] - 2;
      const statusH = 5;
      const badgeX = curX + (colWidths[5] - statusW) / 2;
      const badgeY = y + 2;

      let badgeColor = [71, 85, 105]; // Slate
      if (status === 'Approved' || status === 'Editorial Approved') badgeColor = [22, 163, 74]; // Green
      else if (status === 'Pending' || status === 'Review Requested') badgeColor = [217, 119, 6]; // Amber
      else if (status === 'Rejected') badgeColor = [220, 38, 38]; // Red

      doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
      doc.roundedRect(badgeX, badgeY, statusW, statusH, 1, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(status.toUpperCase(), badgeX + statusW / 2, badgeY + 3.6, { align: 'center' });

      y += rowHeight;
    });

    // Final Page Footer
    drawFooter(pageNum);

    doc.save('Journal_Publications_Report.pdf');
    this.toastService.success('Journal Publications Report PDF generated successfully!');
  }


  getJournal() {
    this.journalService.getJournals().subscribe((res: AppQuery<Journals[]>) => {
      this.journal = res.data;
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
      width: '900px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPapers();
      }
    });
  }

  editPaper(paperId: number) {
    this.papersService.getPaperById(paperId).subscribe({
      next: (res: AppQuery<Papers>) => {
        const paperToUpdate = res?.data;

        const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
          width: '900px',
          height: '700px',
          maxWidth: 'none',
          autoFocus: true,
          data: paperToUpdate,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.toastService.success('Paper updated successfully!');
            this.getPapers();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching paper:', error);
        this.toastService.error('Failed to fetch paper details.');
      },
    });
  }

  viewPaper(id: number) {
    const paper = this.papers.find((p) => p.Id === id);

    if (paper?.FileUrl) {
      const link = document.createElement('a');
      link.href = paper.FileUrl;
      link.download = paper.FileUrl.split('/').pop() || 'document.pdf';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn('No PDF file URL found.');
    }
  }

  viewJournal(id: number) {
    if (!id) return;
    this.journalService.getById(id).subscribe({
      next: (res) => {
        const fileUrl = res?.data?.FileUrl;

        if (!fileUrl) {
          console.warn('No file URL found');
          return;
        }

        window.open(fileUrl, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  public getSeverity(
    status: string | undefined,
  ): 'info' | 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Pending':
        return 'warn';
      case 'Draft':
        return 'info';
      case 'Review Requested':
        return 'warn';
      case 'Editorial Approved':
        return 'success';
      default:
        return 'secondary';
    }
  }

  onApprove(paperId: any) {
    const dialogRef = this.dialog.open(PaperApprovalConfirmationComponent, {
      width: '500px',
      autoFocus: true,
      data: { PaperId: paperId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPapers();
      }
    });
  }

  isUserAllowedToApproveOrEdit(paper: any) {
    const [paperAproval] = paper?.PaperApprovals;

    if (
      paperAproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Draft ||
      paperAproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Pending
    ) {
      false;
    }
    return false;
  }
}
