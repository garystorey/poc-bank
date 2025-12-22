import { Component } from '@angular/core';
import { StepComponent } from "../step/step.component";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [StepComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {

  currentStep = 1;
  steps = [
    { number: 1, label: 'Personal Information' },
    { number: 2, label: 'Funding' },
    { number: 3, label: 'Review' },
    { number: 4, label: 'Confirmation' },
  ];

  setCurrentStep(step: number) {
    this.currentStep = step;
  }

}
