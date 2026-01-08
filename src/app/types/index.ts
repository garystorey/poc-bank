import { AbstractControl, ValidationErrors } from "@angular/forms";

export type AccountType = 'checking' | 'savings' | 'credit';
export type TransactionFilter = 'all' | 'deposit' | 'withdrawal' | 'transfer';

export type TransactionType = Exclude<TransactionFilter, 'all'>;

export type SortDirection = 'asc' | 'desc';
export type SortField = 'date' | 'amount' | 'type' | 'description';

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}


export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination
}
export interface UserDto {
  id: number;
  name: string;
  email: string;
}
export interface AccountDto {
  id: number;
  userId: number;
  type: AccountType;
  balance: number;
}

export interface TransactionDto {
  id: number;
  accountId: number;
  type: TransactionType;
  amount: number;
  description: string;
  location?: string;
  postedAt: string;
}

export interface Service {
    title: string;
    description: string;
}

export interface Feature extends Service {
    icon: string;
}

export interface Testimonial {
    name: string;
    position: string;
    feedback: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

export type ErrorSummaryMessage =
  | string
  | Record<string, string>
  | ((errors: ValidationErrors | null, control: AbstractControl) => string);

export type ErrorSummaryMessages = Record<string, ErrorSummaryMessage>;

export type ErrorItem = {
  path: string;
  message: string;
  anchorId: string; // used to link/focus the field; defaults to path
};

export interface Transaction {
  id: number;
  account: AccountType;
  date: string;
  description: string;
  location?: string;
  type: TransactionType;
  amount: number;
}
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}
