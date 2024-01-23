import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  faPlus = faPlus;
}
