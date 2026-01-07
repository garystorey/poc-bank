import { Component } from "@angular/core";
import { TopnavComponent } from "../shared/ui/header/topnav.component";
import { FooterComponent } from "../shared/ui/footer/footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-home-layout",
  standalone: true,
  imports: [TopnavComponent, FooterComponent, RouterOutlet],
  template: `
    <app-topnav [isOnboardingPage]="false" />
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class HomeLayoutComponent {

}
