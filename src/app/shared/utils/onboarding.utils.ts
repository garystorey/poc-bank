import {Option} from '../../types';

export const DEPOSIT_METHODS: Option[] = [
    { value: '', label: 'Select Method' },
    { value: 'check', label: 'Check' },
    { value: 'ach', label: 'ACH Transfer' },
    { value: 'wire', label: 'Wire Transfer' },
    { value: 'cash', label: 'Cash' },
  ] as const;

export const FUNDING_SOURCES: Option[] = [
    { value: '', label: 'Select Source' },
    { value: 'payroll', label: 'Payroll' },
    { value: 'savings', label: 'Savings' },
    { value: 'external', label: 'External Account' },
    { value: 'other', label: 'Other' },
  ] as const;

export const ACCOUNT_TYPES: Option[] = [
    { value: '', label: 'Select Type' },
    { value: 'checking', label: 'Checking' },
    { value: 'savings', label: 'Savings' },
  ] as const;

