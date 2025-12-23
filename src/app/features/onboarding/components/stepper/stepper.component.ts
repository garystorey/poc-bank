import { Component, input } from '@angular/core';
import { StepComponent } from "../step/step.component";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [StepComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  currentStep = input<number>(1)  ;
  steps =[
    { number: 1, label: 'Personal Information' },
    { number: 2, label: 'Funding' },
    { number: 3, label: 'Review' },
    { number: 4, label: 'Confirmation' },
  ]
  get progressClass() {
    return `progress-fill progress-${this.currentStep()}`;
  }



}
