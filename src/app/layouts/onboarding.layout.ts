import { Component } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { OnboardingheaderComponent } from "./components/onboardingheader/onboardingheader.component";
import { StepperComponent } from "../features/onboarding/components/stepper/stepper.component";

@Component({
  selector: "app-onboarding-layout",
  standalone: true,
  imports: [OnboardingheaderComponent, FooterComponent, RouterOutlet, StepperComponent],
  template: `
    <app-onboardingheader/>
    <main>
      <div class="wizard-container">
        <app-stepper [steps]="this.steps" [currentStep]="this.currentStep"/>
        <div class="form-container">
          <router-outlet/>
        </div>
      </div>
    </main>
    <app-footer/>
  `,
  styles: [
    `
    .wizard-container {
        background: var(--white);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-lg);
        width: 100%;
        overflow: hidden;
        max-width: 120ch;
        margin: 0 auto;
        padding: var(--spacing-xl);
    }
    `,

  ]
})
export class OnboardingLayoutComponent {

  currentStep = 1

  steps =[
    { number: 1, label: 'Personal Information' },
    { number: 2, label: 'Funding' },
    { number: 3, label: 'Review' },
    { number: 4, label: 'Confirmation' },
  ]

  setCurrentStep(step: number) {
    this.currentStep = step;
  }

}
