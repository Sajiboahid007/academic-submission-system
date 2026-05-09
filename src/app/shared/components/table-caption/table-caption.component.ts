import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-caption',
  standalone: false,
  templateUrl: './table-caption.component.html',
  styleUrl: './table-caption.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCaptionComponent {
  @Input() table!: Table;
  @Input() isCsvExportRequired: boolean = false;

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.table) {
      this.table.filterGlobal(input.value, 'contains');
    }
  }
}
