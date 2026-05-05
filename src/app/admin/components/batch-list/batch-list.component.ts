import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Batches } from '../../../fds-config/entity-models/batch';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BatchService } from '../../services/batch-service';
import { InsertUpdateBatchesComponent } from './insert-update-batches/insert-update-batches.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-batch-list',
  standalone: false,
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchListComponent implements OnInit {
  batches: Batches[] = [];

  dataSource = new MatTableDataSource<Batches>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private dialogRef!: MatDialogRef<any>;

  displayedColumns = ['Name', 'Year', 'Department', 'Action'];

  constructor(
    private readonly batchService: BatchService,
    private readonly dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.getBatches();
  }

  getBatches() {
    this.batchService.getBatches().subscribe({
      next: (response) => {
        this.batches = response.data;
        this.dataSource.data = this.batches;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching batches:', error);
      },
    });
  }

  AddBatch() {
    const dialogRef = this.dialog.open(InsertUpdateBatchesComponent, {
      width: '500px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBatches();
      }
    });
  }

  onDeleteBatch(batch: Batches) {}
  onEditBatch(batch: Batches) {}
}
