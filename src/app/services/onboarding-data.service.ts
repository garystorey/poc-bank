import { Injectable, signal } from '@angular/core';

export type IdentityDetails = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  emailAddress: string;
};

export type FundingDetails = {
  initialAmount: string;
  depositMethod: string;
  fundingSource: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
};

@Injectable({ providedIn: 'root' })
export class OnboardingDataService {
  private readonly identity = signal<IdentityDetails | null>(null);
  private readonly funding = signal<FundingDetails | null>(null);

  setIdentity(details: IdentityDetails): void {
    this.identity.set(details);
  }

  setFunding(details: FundingDetails): void {
    this.funding.set(details);
  }

  getIdentity(): IdentityDetails | null {
    return this.identity();
  }

  getFunding(): FundingDetails | null {
    return this.funding();
  }

  clear(): void {
    this.identity.set(null);
    this.funding.set(null);
  }
}
