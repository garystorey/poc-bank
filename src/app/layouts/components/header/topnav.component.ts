import { ChangeDetectionStrategy, Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopnavComponent {
  private platformId = inject(PLATFORM_ID);

  readonly mobileMenuOpen = signal(false);
  readonly isDarkMode = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const newTheme = this.isDarkMode() ? 'light' : 'dark';
      this.isDarkMode.set(!this.isDarkMode());
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }
}
