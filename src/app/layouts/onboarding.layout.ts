import { Component } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { OnboardingheaderComponent } from "./components/onboardingheader/onboardingheader.component";
import { StepperComponent } from "../features/onboarding/components/stepper/stepper.component";
import { WizardheaderComponent } from "./components/wizardheader/wizardheader.component";

@Component({
  selector: "app-onboarding-layout",
  standalone: true,
  imports: [OnboardingheaderComponent, FooterComponent, RouterOutlet, StepperComponent],
  template: `
    <app-onboardingheader/>
    <main>
      <div class="wizard-container">
        <app-stepper/>
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

}
