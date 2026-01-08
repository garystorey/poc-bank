import { Component } from "@angular/core";
import { FooterComponent, PageHeaderComponent } from "../shared/ui/";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-onboarding-layout",
  standalone: true,
  imports: [ FooterComponent, RouterOutlet, PageHeaderComponent],
  template: `
    <app-header [isOnboardingPage]="true"/>
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
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-lg);
        width: 100%;
        overflow: hidden;
        max-width: 120ch;
        margin: 2rem auto;
        padding: var(--spacing-sm) var(--spacing-xl);
        transition: background-color var(--transition-base), border-color var(--transition-base);
    }

    @media (max-width: 768px) {
        .wizard-container {
            margin: 1rem;
            padding: var(--spacing-sm);
            max-width: calc(100% - 2rem);
        }
    }
    `,
  ]
})
export class OnboardingLayoutComponent {
}
