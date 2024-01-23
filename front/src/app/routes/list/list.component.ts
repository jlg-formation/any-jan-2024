import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  faRotateRight = faRotateRight;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
}
