import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, distinctUntilChanged } from 'rxjs';
import { SelectOption, TransactionFilter } from '../../types/types';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SelectComponent } from '../../shared/ui/select/select.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { AccountStoreService } from '../../services/account-store.service';
import { TransactionDto } from '../../types/api-types';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe, TitleCasePipe, ButtonComponent, SelectComponent, InputComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  readonly store = inject(AccountStoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  readonly accounts = computed<SelectOption[]>(() => {
    const accounts = this.store.accounts();
    const filtered = accounts.filter((account) => ['checking', 'savings'].includes(account.type));
    const source = filtered.length ? filtered : accounts;
    return source.map((account) => ({
      value: String(account.id),
      label: `${account.type.charAt(0).toUpperCase()}${account.type.slice(1)}`,
    }));
  });

  readonly transactions = signal<TransactionDto[]>([]);
  readonly selectedAccount = signal<string>('');
  readonly filterType = signal<TransactionFilter>('all');
  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');
  readonly sortColumn = signal<'date' | 'description' | 'type' | 'amount'>('date');
  readonly sortDirection = signal<'asc' | 'desc'>('desc');
  readonly filterOptions: SelectOption[] = [
    { value: 'all', label: 'All', selected: true },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdrawal', label: 'Withdrawals' },
    { value: 'transfer', label: 'Transfers' },
  ];

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => {
          const paramId = Number(params.get('userId'));
          const authId = Number(this.authService.getAccountNumber());
          if (Number.isFinite(paramId) && paramId > 0) {
            return paramId;
          }
          if (Number.isFinite(authId) && authId > 0) {
            return authId;
          }
          return 1;
        }),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((id) => {
        this.store.bootstrap(id);
      });

    effect(() => {
      const selectedId = this.store.selectedAccountId();
      if (selectedId !== null) {
        this.selectedAccount.set(String(selectedId));
      }
    });

    effect(() => {
      this.transactions.set(this.store.transactions());
    });
  }

  readonly filteredTransactions = computed(() => {
    const selectedAccount = this.selectedAccount();
    const filterType = this.filterType();
    const startDate = this.startDate();
    const endDate = this.endDate();
    const sortColumn = this.sortColumn();
    const sortDirection = this.sortDirection();

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const selectedAccountId = selectedAccount ? Number(selectedAccount) : null;

    return this.transactions()
      .filter((transaction) => (selectedAccountId === null ? false : transaction.accountId === selectedAccountId))
      .filter((transaction) =>
        filterType === 'all' ? true : transaction.type === filterType
      )
      .filter((transaction) => {
        const transactionDate = new Date(transaction.postedAt);
        const afterStart = start ? transactionDate >= start : true;
        const beforeEnd = end ? transactionDate <= end : true;
        return afterStart && beforeEnd;
      })
      .sort((a, b) => {
        let comparison = 0;

        switch (sortColumn) {
          case 'date':
            comparison = new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
            break;
          case 'description':
            comparison = a.description.localeCompare(b.description);
            break;
          case 'type':
            comparison = a.type.localeCompare(b.type);
            break;
          case 'amount':
            comparison = a.amount - b.amount;
            break;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
  });

  onAccountChange(account: string) {
    this.selectedAccount.set(account);
    const accountId = Number(account);
    if (Number.isFinite(accountId)) {
      this.store.selectAccount(accountId);
    }
  }

  onFilterTypeChange(filter: TransactionFilter) {
    this.filterType.set(filter);
  }

  onStartDateChange(date: string) {
    this.startDate.set(date);
  }

  onEndDateChange(date: string) {
    this.endDate.set(date);
  }

  resetFilters() {
    this.filterType.set('all');
    this.startDate.set('');
    this.endDate.set('');
    this.sortColumn.set('date');
    this.sortDirection.set('desc');
  }

  changeSort(column: 'date' | 'description' | 'type' | 'amount') {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
      return;
    }

    this.sortColumn.set(column);
    this.sortDirection.set(column === 'date' ? 'desc' : 'asc');
  }

  getAriaSort(column: 'date' | 'description' | 'type' | 'amount') {
    if (this.sortColumn() !== column) {
      return 'none';
    }

    return this.sortDirection() === 'asc' ? 'ascending' : 'descending';
  }
}
