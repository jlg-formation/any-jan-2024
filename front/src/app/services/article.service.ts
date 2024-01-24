import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, switchMap, tap } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined = undefined;

  constructor(private readonly http: HttpClient) {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      switchMap(() => this.http.post<void>(url, newArticle)),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Erreur Technique');
      })
    );
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      switchMap(() => this.http.get<Article[]>(url)),
      map((articles) => {
        this.articles = articles;
      }),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Erreur Technique');
      })
    );
  }
}
