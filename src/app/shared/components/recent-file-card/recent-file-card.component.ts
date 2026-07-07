import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Papers } from '../../../fds-config/entity-models/papers';
import { Journals } from '../../../fds-config/entity-models/journals';
import { HomeService } from '../../../admin/services/home-service';
import { JournalService } from '../../../admin/services/journal-service';
import { ToastService } from '../../services/toast.service';
import { AppQuery } from '../../app-query';

@Component({
  selector: 'app-recent-file-card',
  standalone: false,
  templateUrl: './recent-file-card.component.html',
  styleUrl: './recent-file-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentFileCardComponent implements OnInit {


  paper: any[] = [];
  journals: any[] = [];

  currentPaperIndex = 0;
  currentJournalIndex = 0;

  constructor(
    private readonly homeService: HomeService,
    private readonly journalService: JournalService,
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef
  ) {

  }
  ngOnInit(): void {
    this.getPapers();
    this.getJournals();
  }

  getPapers() {
    this.homeService.getPapers().subscribe({
      next: (res: AppQuery<Papers[]>) => {
        this.paper = res.data.slice(0, 5);
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  getJournals() {
    this.homeService.getJournals().subscribe({
      next: (res: AppQuery<Journals[]>) => {
        this.journals = res.data.slice(0, 5);
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  nextPaper(): void {
    if (this.paper.length === 0) return;
    this.currentPaperIndex = (this.currentPaperIndex + 1) % this.paper.length;
    this.cdr.markForCheck();
  }

  prevPaper(): void {
    if (this.paper.length === 0) return;
    this.currentPaperIndex = (this.currentPaperIndex - 1 + this.paper.length) % this.paper.length;
    this.cdr.markForCheck();
  }

  goToPaper(index: number): void {
    if (index >= 0 && index < this.paper.length) {
      this.currentPaperIndex = index;
      this.cdr.markForCheck();
    }
  }

  nextJournal(): void {
    if (this.journals.length === 0) return;
    this.currentJournalIndex = (this.currentJournalIndex + 1) % this.journals.length;
    this.cdr.markForCheck();
  }

  prevJournal(): void {
    if (this.journals.length === 0) return;
    this.currentJournalIndex = (this.currentJournalIndex - 1 + this.journals.length) % this.journals.length;
    this.cdr.markForCheck();
  }

  goToJournal(index: number): void {
    if (index >= 0 && index < this.journals.length) {
      this.currentJournalIndex = index;
      this.cdr.markForCheck();
    }
  }

  viewPaper(paperId: number): void {
    const item = this.paper.find(p => p.Id === paperId);
    if (item?.FileUrl) {
      window.open(item.FileUrl, '_blank');
    } else {
      this.toastService.warn('No PDF file found for this paper.');
    }
  }

  viewJournal(journalId: number): void {
    const item = this.journals.find(j => j.Id === journalId);
    if (item?.FileUrl) {
      window.open(item.FileUrl, '_blank');
    } else {
      this.toastService.warn('No PDF file found for this journal.');
    }
  }

}

