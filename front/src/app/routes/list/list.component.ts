import { Component, OnInit } from '@angular/core';
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
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  errorMsg = '';
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  selectedArticles = new Set<Article>();
  isRemoving = false;

  constructor(protected readonly articleService: ArticleService) {
    console.log('instantiate service article');
  }

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      this.refresh();
    }
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

  remove() {
    console.log('remove');
    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isRemoving = true;
        }),
        switchMap(() => {
          const ids = [...this.selectedArticles].map((a) => a.id);
          return this.articleService.remove(ids);
        }),
        switchMap(() => {
          return this.articleService.refresh();
        }),
        tap(() => {
          this.selectedArticles.clear();
        }),
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof Error) {
            this.errorMsg = 'Erreur Technique';
          }
          return of(undefined);
        }),
        finalize(() => {
          this.isRemoving = false;
        })
      )
      .subscribe();
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
