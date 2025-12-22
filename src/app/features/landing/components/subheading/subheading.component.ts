import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subheading',
  standalone: true,
  imports: [],
  templateUrl: './subheading.component.html',
  styleUrl: './subheading.component.scss'
})
export class SubheadingComponent {
  title = input<string>('');
  description = input<string>('');

}
