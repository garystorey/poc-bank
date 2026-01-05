import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountType, SelectOption, Transaction, TransactionFilter } from '../../types/types';
import { accountTypes, fakeTransactions } from './fakeData';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SelectComponent } from '../../shared/ui/select/select.component';
import { ACCOUNT_TYPES } from '../../shared/utils/onboarding.utils';
import { InputComponent } from "../../shared/ui/input/input.component";


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe, TitleCasePipe, ButtonComponent, SelectComponent, InputComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnInit {
  readonly accounts: SelectOption[] = ACCOUNT_TYPES;

  readonly transactions = signal<Transaction[]>(fakeTransactions);
  readonly selectedAccount = signal<AccountType>('checking');
  readonly filterType = signal<TransactionFilter>('all');
  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');
  readonly filterOptions: SelectOption[] = [
    { value: 'all', label: 'All', selected: true },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdrawal', label: 'Withdrawals' },
    { value: 'transfer', label: 'Transfers' },
  ];

  ngOnInit(): void {
    // Initialization logic if needed

  }

  readonly filteredTransactions = computed(() => {
    const selectedAccount = this.selectedAccount();
    const filterType = this.filterType();
    const startDate = this.startDate();
    const endDate = this.endDate();

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return this.transactions()
      .filter((transaction) => transaction.account === selectedAccount)
      .filter((transaction) =>
        filterType === 'all' ? true : transaction.type === filterType
      )
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const afterStart = start ? transactionDate >= start : true;
        const beforeEnd = end ? transactionDate <= end : true;
        return afterStart && beforeEnd;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  onAccountChange(account: AccountType) {
    this.selectedAccount.set(account);
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

  applyFilter() {
    // Filters are applied immediately via signals, but this keeps the button accessible
    // and explicit for keyboard users.
  }
}
