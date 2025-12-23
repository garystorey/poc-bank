import { Component, input } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { OnboardingheaderComponent } from "./components/onboardingheader/onboardingheader.component";

@Component({
  selector: "app-onboarding-layout",
  standalone: true,
  imports: [OnboardingheaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-onboardingheader/>
    <main>
      <div class="wizard-container">
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
        margin: 2rem auto;
        padding: var(--spacing-sm) var(--spacing-xl);
    }
    `,

  ]
})
export class OnboardingLayoutComponent {
}
