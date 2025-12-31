import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-subheading',
  standalone: true,
  imports: [],
  templateUrl: './subheading.component.html',
  styleUrl: './subheading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubheadingComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
}
