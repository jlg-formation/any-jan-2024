import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;

  errorMsg = '';

  constructor(protected readonly articleService: ArticleService) {
    console.log('instantiate service article');
  }

  refresh() {
    of(undefined)
      .pipe(
        switchMap(() => this.articleService.refresh()),
        catchError((err) => {
          if (err instanceof Error) {
            this.errorMsg = err.message;
          }
          return of(undefined);
        })
      )
      .subscribe();
  }
}
