import { inject, Injectable, computed, effect, signal } from '@angular/core';
import { ApiService } from './api.service';
import { AccountDto, TransactionDto, UserDto } from '../types/api-types';

@Injectable({ providedIn: 'root' })
export class AccountStoreService {
  private readonly api = inject(ApiService);

  private readonly _users = signal<UserDto[]>([]);
  private readonly _accounts = signal<AccountDto[]>([]);
  private readonly _transactions = signal<TransactionDto[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _selectedAccountId = signal<number | null>(null);

  readonly users = computed(() => this._users());
  readonly accounts = computed(() => this._accounts());
  readonly transactions = computed(() => this._transactions());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly selectedAccountId = computed(() => this._selectedAccountId());

  readonly selectedAccount = computed(() =>
    this._accounts().find((acc) => acc.id === this._selectedAccountId()) ?? null
  );

  constructor() {
    effect(() => {
      const selected = this._selectedAccountId();
      if (selected !== null) {
        this.loadTransactions(selected);
      }
    });
  }

  bootstrap(userId = 1) {
    this._loading.set(true);
    this._error.set(null);

    this.api.listUsers({ pageSize: 50 }).subscribe({
      next: (response) => {
        this._users.set(response.data);
      },
      error: () => {
        this._error.set('Unable to load users');
      },
    });

    this.api.listAccounts({ userId, pageSize: 50 }).subscribe({
      next: (response) => {
        this._accounts.set(response.data);
        this._selectedAccountId.set(response.data[0]?.id ?? null);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Unable to load accounts');
        this._loading.set(false);
      },
    });
  }

  loadTransactions(accountId: number) {
    this._loading.set(true);
    this._error.set(null);
    this.api.listTransactions({ accountId, pageSize: 50 }).subscribe({
      next: (response) => {
        this._transactions.set(response.data);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Unable to load transactions');
        this._loading.set(false);
      },
    });
  }

  selectAccount(accountId: number) {
    this._selectedAccountId.set(accountId);
  }

  optimisticDeposit(amount: number, description: string) {
    const selectedAccount = this._selectedAccountId();
    if (!selectedAccount) return;
    const newTransaction: TransactionDto = {
      id: Date.now(),
      accountId: selectedAccount,
      amount,
      description,
      type: 'deposit',
      postedAt: new Date().toISOString(),
    };
    this._transactions.update((existing) => [newTransaction, ...existing]);
  }
}
