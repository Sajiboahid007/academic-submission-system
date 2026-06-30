import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service';
import { Papers } from '../../../fds-config/entity-models/papers';
import { Journals } from '../../../fds-config/entity-models/journals';

@Component({
  selector: 'home',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {

  papers: Papers[] = []
  journals: Journals[] = []

  allPapers: any

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getAllPapers();
    this.getJournals();

    this.getAllPapers()
  }

  getPapers() {
    this.homeService.getPapers().subscribe({
      next: (res) => {
        this.papers = res?.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getJournals() {
    this.homeService.getJournals().subscribe({
      next: (res) => {
        this.journals = res?.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllPapers() {
    this.homeService.getAllPapers().subscribe({
      next: (res) => {
        this.allPapers = res?.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
