import { Component } from "@angular/core";
import { TopnavComponent } from "./components/header/topnav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-home-layout",
  standalone: true,
  imports: [TopnavComponent, FooterComponent, RouterOutlet],
  template: `
    <app-topnav></app-topnav>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: []
})
export class HomeLayoutComponent {

}
