import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Feature } from '../../../../types';

@Component({
  selector: 'app-featurecard',
  standalone: true,
  imports: [],
  templateUrl: './featurecard.component.html',
  styleUrl: './featurecard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
  readonly feature = input<Feature>({ icon: '', title: '', description: '' });
}
