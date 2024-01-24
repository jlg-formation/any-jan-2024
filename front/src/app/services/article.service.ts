import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
    return this.http.get<Article[]>(url).pipe(
      map((articles) => {
        this.articles = articles;
      })
    );
  }
}
