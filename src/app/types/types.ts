import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface Feature {
    icon: string;
    title: string;
    description: string;
}
export interface Service {
    title: string;
    description: string;
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

export type AccountType = 'checking' | 'savings' | 'credit';
export type TransactionFilter = 'all' | 'deposit' | 'withdrawal' | 'transfer';

export type TransactionType = Exclude<TransactionFilter, 'all'>;

export interface Transaction {
  id: number;
  account: AccountType;
  date: string;
  description: string;
  location?: string;
  type: TransactionType;
  amount: number;
}
