import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type AccountType = 'checking' | 'savings' | 'credit';
type TransactionFilter = 'all' | 'deposit' | 'withdrawal' | 'transfer';

type TransactionType = Exclude<TransactionFilter, 'all'>;

interface Transaction {
  id: number;
  account: AccountType;
  date: string;
  description: string;
  location?: string;
  type: TransactionType;
  amount: number;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  readonly accounts: AccountType[] = ['checking', 'savings', 'credit'];

  readonly transactions = signal<Transaction[]>([
    { id: 1, account: 'checking', date: '2024-06-12', description: 'Direct Deposit', type: 'deposit', amount: 3200 },
    { id: 2, account: 'checking', date: '2024-06-10', description: 'Utility Payment', location: 'City Power', type: 'withdrawal', amount: -185.4 },
    { id: 3, account: 'checking', date: '2024-06-08', description: 'Coffee Run', location: 'Crescent Coffee', type: 'withdrawal', amount: -14.25 },
    { id: 4, account: 'checking', date: '2024-06-03', description: 'Grocery Pickup', location: 'Market District', type: 'withdrawal', amount: -126.9 },
    { id: 5, account: 'checking', date: '2024-05-29', description: 'Online Transfer', type: 'transfer', amount: -500 },
    { id: 6, account: 'checking', date: '2024-05-27', description: 'Incoming Transfer', type: 'deposit', amount: 250 },
    { id: 7, account: 'checking', date: '2024-05-21', description: 'Dining Out', location: 'The Blue Olive', type: 'withdrawal', amount: -62.18 },
    { id: 8, account: 'checking', date: '2024-05-18', description: 'ATM Withdrawal', location: 'Downtown Branch', type: 'withdrawal', amount: -120 },
    { id: 9, account: 'checking', date: '2024-05-14', description: 'Mobile Deposit', location: 'Remote Check', type: 'deposit', amount: 410 },
    { id: 10, account: 'savings', date: '2024-06-01', description: 'Transfer from Checking', type: 'deposit', amount: 500 },
    { id: 11, account: 'savings', date: '2024-05-15', description: 'Monthly Interest', type: 'deposit', amount: 8.73 },
    { id: 12, account: 'savings', date: '2024-05-02', description: 'Transfer to Checking', type: 'transfer', amount: -300 },
    { id: 13, account: 'savings', date: '2024-04-17', description: 'Emergency Fund Deposit', type: 'deposit', amount: 1000 },
    { id: 14, account: 'savings', date: '2024-03-30', description: 'Vacation Withdrawal', type: 'withdrawal', amount: -450 },
    { id: 15, account: 'credit', date: '2024-06-11', description: 'Online Purchase', location: 'TechStop', type: 'withdrawal', amount: -349.99 },
    { id: 16, account: 'credit', date: '2024-06-09', description: 'Gas Station', location: 'Fuel Express', type: 'withdrawal', amount: -68.45 },
    { id: 17, account: 'credit', date: '2024-06-05', description: 'Payment Received', type: 'deposit', amount: 600 },
    { id: 18, account: 'credit', date: '2024-05-28', description: 'Grocery Delivery', location: 'QuickGrocer', type: 'withdrawal', amount: -96.5 },
    { id: 19, account: 'credit', date: '2024-05-18', description: 'Streaming Services', location: 'BundlePay', type: 'withdrawal', amount: -42.97 },
    { id: 20, account: 'credit', date: '2024-05-10', description: 'Balance Transfer', type: 'transfer', amount: -200 },
    { id: 21, account: 'checking', date: '2024-04-28', description: 'Insurance Refund', type: 'deposit', amount: 120.35 },
    { id: 22, account: 'checking', date: '2024-04-15', description: 'Charity Donation', location: 'Community Care', type: 'withdrawal', amount: -75 },
    { id: 23, account: 'savings', date: '2024-04-05', description: 'Round-up Transfer', type: 'deposit', amount: 35.42 },
    { id: 24, account: 'credit', date: '2024-03-15', description: 'Travel Booking', location: 'Skybound Airlines', type: 'withdrawal', amount: -520.75 },
    { id: 25, account: 'checking', date: '2024-03-01', description: 'Tax Refund', type: 'deposit', amount: 1435.66 },
  ]);

  readonly selectedAccount = signal<AccountType>('checking');

  readonly pendingFilterType = signal<TransactionFilter>('all');
  readonly pendingStartDate = signal<string>('');
  readonly pendingEndDate = signal<string>('');

  readonly activeFilterType = signal<TransactionFilter>('all');
  readonly activeStartDate = signal<string>('');
  readonly activeEndDate = signal<string>('');

  readonly filteredTransactions = computed(() => {
    const selectedAccount = this.selectedAccount();
    const filterType = this.activeFilterType();
    const startDate = this.activeStartDate();
    const endDate = this.activeEndDate();

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
    this.pendingFilterType.set(filter);
  }

  onStartDateChange(date: string) {
    this.pendingStartDate.set(date);
  }

  onEndDateChange(date: string) {
    this.pendingEndDate.set(date);
  }

  applyFilter() {
    this.activeFilterType.set(this.pendingFilterType());
    this.activeStartDate.set(this.pendingStartDate());
    this.activeEndDate.set(this.pendingEndDate());
  }
}
