import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StepComponent } from "../step/step.component";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [StepComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  readonly currentStep = input<number>(1);

  readonly steps = [
    { number: 1, label: 'Personal Information' },
    { number: 2, label: 'Funding' },
    { number: 3, label: 'Review' },
    { number: 4, label: 'Confirmation' },
  ];

  readonly progressClass = computed(() => `progress-fill progress-${this.currentStep()}`);
}
