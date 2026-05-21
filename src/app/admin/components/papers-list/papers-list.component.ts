import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PapersService } from '../../services/papers-service';
import { Papers } from '../../../fds-config/entity-models/papers';
import { AppQuery } from '../../../shared/app-query';
import { MatDialog } from '@angular/material/dialog';
import { InsertUpdatePaperComponent } from './insert-update-paper/insert-update-paper.component';

@Component({
  selector: 'app-papers-list',
  standalone: false,
  templateUrl: './papers-list.component.html',
  styleUrl: './papers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapersListComponent implements OnInit {


  papers: Papers[] = [];

  constructor(private readonly papersService: PapersService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.getPapers();
  }


  getPapers() {
    this.papersService.getPapers().subscribe((res: AppQuery<Papers[]>) => {
      this.papers = res.data;
      this.cdr.detectChanges();
    });
  }

  AddPapers() {
    const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
      width: '500px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPapers();
      }
    });
  }

}
