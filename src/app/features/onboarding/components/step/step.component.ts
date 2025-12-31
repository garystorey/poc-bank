import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
  readonly stepNumber = input<number>(1);
  readonly stepLabel = input<string>('');
  readonly active = input<boolean>(false);
  readonly currentStep = input<number>(1);

  readonly stepClass = computed(() => {
    if (this.stepNumber() < this.currentStep()) {
      return 'step completed';
    } else if (this.stepNumber() === this.currentStep()) {
      return 'step active';
    } else {
      return 'step';
    }
  });
}
