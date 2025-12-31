import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-wizardheader',
  standalone: true,
  imports: [],
  templateUrl: './wizardheader.component.html',
  styleUrl: './wizardheader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardheaderComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
}
