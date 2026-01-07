import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AccountDto, PaginatedResponse, TransactionDto, UserDto } from '../types/api-types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4000/api';

  listUsers(params: Record<string, string | number> = {}): Observable<PaginatedResponse<UserDto>> {
    return this.http.get<PaginatedResponse<UserDto>>(`${this.baseUrl}/users`, { params: this.buildParams(params) });
  }

  getUser(id: number): Observable<{ user: UserDto; accounts: AccountDto[] }> {
    return this.http.get<{ user: UserDto; accounts: AccountDto[] }>(`${this.baseUrl}/users/${id}`);
  }

  listAccounts(params: Record<string, string | number> = {}): Observable<PaginatedResponse<AccountDto>> {
    return this.http.get<PaginatedResponse<AccountDto>>(`${this.baseUrl}/accounts`, { params: this.buildParams(params) });
  }

  listTransactions(params: Record<string, string | number> = {}): Observable<PaginatedResponse<TransactionDto>> {
    return this.http.get<PaginatedResponse<TransactionDto>>(`${this.baseUrl}/transactions`, { params: this.buildParams(params) });
  }

  usersSignal(params: Record<string, string | number> = {}): Signal<PaginatedResponse<UserDto> | undefined> {
    return toSignal(this.listUsers(params), { initialValue: undefined });
  }

  accountsSignal(params: Record<string, string | number> = {}): Signal<PaginatedResponse<AccountDto> | undefined> {
    return toSignal(this.listAccounts(params), { initialValue: undefined });
  }

  transactionsSignal(params: Record<string, string | number> = {}): Signal<PaginatedResponse<TransactionDto> | undefined> {
    return toSignal(this.listTransactions(params), { initialValue: undefined });
  }

  private buildParams(params: Record<string, string | number>) {
    return Object.entries(params).reduce((httpParams, [key, value]) => {
      if (value === undefined || value === null) {
        return httpParams;
      }
      return httpParams.set(key, String(value));
    }, new HttpParams());
  }
}
