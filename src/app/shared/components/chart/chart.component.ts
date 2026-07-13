import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PapersService } from '../../../admin/services/papers-service';
import { JournalService } from '../../../admin/services/journal-service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { forkJoin } from 'rxjs';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {

  totalPapers: number = 0;
  totalJournals: number = 0;
  public barChartType: ChartType = 'bar';

  constructor(
    private readonly papersService: PapersService,
    private readonly journalsService: JournalService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMonthlyChartData();
  }

  /** Aggregate a list of items by their CreatedDate month (0-indexed) into a 12-element array. */
  private aggregateByMonth(items: { CreatedDate?: Date | null }[]): number[] {
    const counts = new Array(12).fill(0);
    for (const item of items) {
      if (item.CreatedDate) {
        const month = new Date(item.CreatedDate).getMonth(); // 0 = Jan
        if (month >= 0 && month < 12) {
          counts[month]++;
        }
      }
    }
    return counts;
  }

  loadMonthlyChartData(): void {
    forkJoin({
      papers: this.papersService.getPapers(),
      journals: this.journalsService.getJournals(),
    }).subscribe(({ papers, journals }) => {
      this.totalPapers = papers.data?.length ?? 0;
      this.totalJournals = journals.data?.length ?? 0;

      const paperCounts = this.aggregateByMonth(papers.data ?? []);
      const journalCounts = this.aggregateByMonth(journals.data ?? []);

      this.barChartData = {
        labels: MONTH_LABELS,
        datasets: [
          {
            label: 'Papers',
            data: paperCounts,
            backgroundColor: 'rgba(6, 8, 106, 0.75)',
            borderColor: 'rgba(6, 8, 106, 1)',
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Journals',
            data: journalCounts,
            backgroundColor: 'rgba(15, 225, 117, 0.75)',
            borderColor: 'rgba(16, 196, 88, 1)',
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
          },
        ],
      };

      this.cdr.markForCheck();
    });
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'Papers',
        data: new Array(12).fill(0),
        backgroundColor: 'rgba(19, 22, 210, 0.75)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Journals',
        data: new Array(12).fill(0),
        backgroundColor: 'rgba(15, 225, 117, 0.75)',
        borderColor: 'rgba(13, 155, 44, 1)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { size: 13, weight: 'bold' },
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { size: 12 },
        },
        grid: {
          color: 'rgba(0,0,0,0.06)',
        },
      },
    },
  };
}
