import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
  <section class="cta" id="signup">
    <div class="container">
      <h2>Ready to Get Started?</h2>
      <p>Open a new checking account today and enjoy $0 monthly fees, high interest rates, and access to our premium
        digital banking features.</p>
      <a routerLink="/onboarding" class="btn btn-primary">Open Your Account Now</a>
    </div>
  </section>
`,
  styleUrl: './cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent {}
