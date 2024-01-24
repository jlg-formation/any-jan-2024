import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, switchMap, tap } from 'rxjs';
import { Article } from '../interfaces/article';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
    { id: 'a1', name: 'Tournevis', price: 2.99, qty: 123 },
    { id: 'a2', name: 'Pelle', price: 5.5, qty: 23 },
  ];

  constructor(private readonly http: HttpClient) {}

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
