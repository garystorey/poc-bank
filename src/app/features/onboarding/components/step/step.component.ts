import { Component, input } from '@angular/core';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  stepNumber = input<number>(1);
  stepLabel = input<string>('');
  active = input<boolean>(false);
  currentStep = input<number>(1);

  get stepClass() {
    if (this.stepNumber() < this.currentStep()) {
      return 'step completed';
    } else if (this.stepNumber() === this.currentStep()) {
      return 'step active';
    } else {
      return 'step';
    }
  }
}
