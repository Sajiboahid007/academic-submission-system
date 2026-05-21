import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Papers } from '../../../../fds-config/entity-models/papers';

@Component({
  selector: 'app-insert-update-paper',
  standalone: false,
  templateUrl: './insert-update-paper.component.html',
  styleUrl: './insert-update-paper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdatePaperComponent implements OnInit {

  isEditMode = false;
  papers: Papers[] = []


  ngOnInit(): void {

  }



  onCancel() { }

}
