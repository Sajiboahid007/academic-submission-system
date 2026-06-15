import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paper-detail',
  standalone: false,
  templateUrl: './paper-detail.component.html',
  styleUrl: './paper-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperDetailComponent {

}
