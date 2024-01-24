import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { catchError, of, switchMap } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { NewArticle } from '../../interfaces/article';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  f = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    qty: new FormControl(1, [Validators.required, Validators.min(1)]),
  });
  faPlus = faPlus;

  errorMsg = '';

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router
  ) {}

  submit() {
    console.log('submit');
    of(undefined)
      .pipe(
        switchMap(() => {
          this.errorMsg = '';
          const newArticle: NewArticle = this.f.value as NewArticle;
          return this.articleService.add(newArticle);
        }),
        switchMap(() => {
          return this.articleService.refresh();
        }),
        switchMap(() => {
          return this.router.navigateByUrl('/stock');
        }),
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
