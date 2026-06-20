import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: false
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() buttonLabel: string = 'Add';
  @Input() journalButtonLabel: string = 'Add Jurnal';
  @Input() buttonIcon: string = 'pi pi-plus';
  @Input() journalButtonIcon: string = 'pi pi-file';
  @Input() buttonClass: string = 'p-button-rounded p-button-success';
  @Input() journalButtonClass: string = 'p-button-rounded p-button-success';
  @Input() showButton: boolean = true;

  @Output() onButtonClick = new EventEmitter<void>();
  @Output() onJournalButtonClick = new EventEmitter<void>();

  onClick() {
    this.onButtonClick.emit();
  }

  onClickJournal() {
    this.onJournalButtonClick.emit();
  }
}
