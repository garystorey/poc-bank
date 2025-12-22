import { Component } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { OnboardingheaderComponent } from "./components/onboardingheader/onboardingheader.component";

@Component({
  selector: "app-onboarding-layout",
  standalone: true,
  imports: [OnboardingheaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-onboardingheader/>
    <router-outlet/>
    <app-footer/>
  `,
  styles: []
})
export class OnboardingLayoutComponent {

}
