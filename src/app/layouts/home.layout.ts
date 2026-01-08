import { Component } from "@angular/core";
import { PageHeaderComponent } from "../shared/ui/header/pageheader.component";
import { FooterComponent } from "../shared/ui/footer/footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-home-layout",
  standalone: true,
  imports: [PageHeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header [isOnboardingPage]="false" />
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class HomeLayoutComponent {

}
