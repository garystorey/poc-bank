import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { AccountsComponent } from './accounts.component';
import { AccountDto, TransactionDto } from '../../types';
import { AccountStoreService } from '../../services/account-store.service';
import { AuthService } from '../../services/auth.service';

class MockAccountStoreService {
  accounts = signal<AccountDto[]>([
    { id: 1, userId: 1, type: 'checking', balance: 100 },
    { id: 2, userId: 1, type: 'savings', balance: 200 },
  ]);
  transactions = signal<TransactionDto[]>([
    {
      id: 101,
      accountId: 1,
      type: 'deposit',
      amount: 200,
      description: 'Paycheck',
      postedAt: '2024-01-02',
    },
    {
      id: 102,
      accountId: 2,
      type: 'withdrawal',
      amount: -40,
      description: 'ATM',
      postedAt: '2024-01-03',
    },
  ]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedAccountId = signal<number | null>(1);

  bootstrap = jasmine.createSpy('bootstrap');
  selectAccount = jasmine.createSpy('selectAccount');
}

class MockAuthService {
  getAccountNumber() {
    return null;
  }
}

describe('AccountsComponent', () => {
  let fixture: ComponentFixture<AccountsComponent>;
  let component: AccountsComponent;
  let store: MockAccountStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsComponent],
      providers: [
        { provide: AccountStoreService, useClass: MockAccountStoreService },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ userId: '1' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(AccountStoreService) as unknown as MockAccountStoreService;
    fixture.detectChanges();
  });

  it('filters transactions by selected account', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
  });

  it('updates the selected account when changing the account filter', () => {
    component.onAccountChange('2');
    expect(store.selectAccount).toHaveBeenCalledWith(2);
  });

  it('toggles sorting when selecting the same column', () => {
    expect(component.sortDirection()).toBe('desc');
    component.changeSort('date');
    expect(component.sortDirection()).toBe('asc');
    expect(component.getAriaSort('date')).toBe('ascending');
  });
});
