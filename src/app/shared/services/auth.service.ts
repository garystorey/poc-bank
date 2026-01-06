import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticated = signal(false);
  private readonly accountNumber = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this.authenticated());
  readonly accountRoute = computed(() => {
    const accountId = this.accountNumber();
    return accountId ? ['/accounts', accountId] : ['/accounts'];
  });

  login(accountNumber: string): void {
    this.accountNumber.set(accountNumber);
    this.authenticated.set(true);
  }

  logout(): void {
    this.accountNumber.set(null);
    this.authenticated.set(false);
  }

  getAccountNumber(): string | null {
    return this.accountNumber();
  }
}
