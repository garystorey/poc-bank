export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export interface AccountDto {
  id: number;
  userId: number;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
}

export interface TransactionDto {
  id: number;
  accountId: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description: string;
  location?: string;
  postedAt: string;
}
