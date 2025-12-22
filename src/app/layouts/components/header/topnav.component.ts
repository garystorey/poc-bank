import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {

  activeMenuItem: string = 'dashboard';

  setActiveMenuItem(item: string): void {
    this.activeMenuItem = item;
  }

}
