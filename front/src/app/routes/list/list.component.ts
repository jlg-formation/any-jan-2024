import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { ArticleService } from '../../services/article.service';

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
  faCircleNotch = faCircleNotch;

  errorMsg = '';
  isRefreshing = false;

  constructor(protected readonly articleService: ArticleService) {
    console.log('instantiate service article');
  }

  refresh() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isRefreshing = true;
          this.errorMsg = '';
        }),
        switchMap(() => this.articleService.refresh()),
        catchError((err) => {
          if (err instanceof Error) {
            this.errorMsg = err.message;
          }
          return of(undefined);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      )
      .subscribe();
  }
}
