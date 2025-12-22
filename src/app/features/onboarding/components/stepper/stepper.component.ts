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
  steps = input([{number:0, label: "None"}]);

  setCurrentStep = input((val: number)=>{})

}
