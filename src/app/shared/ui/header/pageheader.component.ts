import { ChangeDetectionStrategy, Component, signal, inject, PLATFORM_ID, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { isPlatformBrowser, NgClass } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ButtonComponent } from "../button/button.component";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, ButtonComponent],
  templateUrl: './pageheader.component.html',
  styleUrl: './pageheader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  private platformId = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly mobileMenuOpen = signal(false);
  readonly isDarkMode = signal(false);
  readonly isOnboardingPage = input<boolean>(false);
  readonly isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolvedTheme = (savedTheme as 'light' | 'dark' | null) ?? (prefersDark ? 'dark' : 'light');
      this.applyTheme(resolvedTheme);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  handleAuthAction(): void {
    if (!this.isAuthenticated()) {
      this.closeMobileMenu();
      return;
    }

    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }

  handleProtectedNavigation(event: Event): void {
    this.closeMobileMenu();

    if (this.isAuthenticated()) {
      event.preventDefault();
      this.router.navigate(this.authService.accountRoute());
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const newTheme = this.isDarkMode() ? 'light' : 'dark';
      this.applyTheme(newTheme);
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.isDarkMode.set(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
