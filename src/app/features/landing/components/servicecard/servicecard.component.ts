import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Service } from '../../../../types/types';

@Component({
  selector: 'app-servicecard',
  standalone: true,
  imports: [],
  templateUrl: './servicecard.component.html',
  styleUrl: './servicecard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  readonly service = input<Service>({ title: '', description: '' });
}
