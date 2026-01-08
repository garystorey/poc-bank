import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PageHeaderComponent, FooterComponent } from "@shared/index";

@Component({
  selector: "app-home-layout",
  standalone: true,
  imports: [PageHeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header [isOnboardingPage]="false" />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class HomeLayoutComponent {

}
