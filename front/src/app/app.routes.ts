import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'legal', component: LegalComponent },
  {
    path: 'stock',
    loadComponent: async () =>
      (await import('./routes/list/list.component')).ListComponent,
  },
  {
    path: 'stock/add',
    loadComponent: async () =>
      (await import('./routes/add/add.component')).AddComponent,
  },
  { path: '**', redirectTo: '/' },
];
