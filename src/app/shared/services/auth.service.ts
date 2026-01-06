import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly authenticated = signal(this.restoreAuthStatus());
  private readonly accountNumber = signal<string | null>(this.restoreAccountNumber());

  readonly isAuthenticated = computed(() => this.authenticated());
  readonly accountRoute = computed(() => {
    const accountId = this.accountNumber();
    return accountId ? ['/accounts', accountId] : ['/accounts'];
  });

  login(accountNumber: string): void {
    this.accountNumber.set(accountNumber);
    this.authenticated.set(true);
    this.persistAuthState(accountNumber, true);
  }

  logout(): void {
    this.accountNumber.set(null);
    this.authenticated.set(false);
    this.persistAuthState(null, false);
  }

  getAccountNumber(): string | null {
    return this.accountNumber();
  }

  private persistAuthState(accountNumber: string | null, authenticated: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!authenticated) {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('accountNumber');
      return;
    }

    localStorage.setItem('authenticated', JSON.stringify(authenticated));
    if (accountNumber) {
      localStorage.setItem('accountNumber', accountNumber);
    }
  }

  private restoreAuthStatus(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const storedStatus = localStorage.getItem('authenticated');
    return storedStatus ? JSON.parse(storedStatus) : false;
  }

  private restoreAccountNumber(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('accountNumber');
  }
}
