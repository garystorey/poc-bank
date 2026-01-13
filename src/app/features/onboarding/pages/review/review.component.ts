import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '@shared/index';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { ApiService, AuthService, OnboardingDataService } from '@services/index';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ButtonComponent, StepperComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {

  router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly onboardingData = inject(OnboardingDataService);

  user = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    email: 'john@example.com',
  };

  deposit = {
    accountType: 'Checking',
    bankName: 'POC Bank',
    routingNumber: '••••••1234',
    accountNumber: '••••••5678',
    initialAmount: '$500.00',
    fundingSource: 'External Bank Transfer',
    depositMethod: 'ACH Transfer',
  };

  constructor() {
    const identity = this.onboardingData.getIdentity();
    const funding = this.onboardingData.getFunding();

    if (identity) {
      this.user = {
        firstName: identity.firstName,
        lastName: identity.lastName,
        address: identity.streetAddress,
        city: identity.city,
        state: identity.state,
        zip: identity.zipCode,
        email: identity.emailAddress,
      };
    }

    if (funding) {
      this.deposit = {
        accountType: funding.accountType,
        bankName: funding.bankName,
        routingNumber: this.maskNumber(funding.routingNumber),
        accountNumber: this.maskNumber(funding.accountNumber),
        initialAmount: funding.initialAmount,
        fundingSource: funding.fundingSource,
        depositMethod: funding.depositMethod,
      };
    }
  }

  handleCreateAccount() {
    const identity = this.onboardingData.getIdentity();
    const funding = this.onboardingData.getFunding();
    if (!identity || !funding) {
      return;
    }

    const name = `${identity.firstName} ${identity.lastName}`.trim();
    const initialDeposit = Number(funding.initialAmount.replace(/[^0-9.]/g, '')) || 0;

    this.api
      .createAccount({
        name,
        email: identity.emailAddress,
        accountType: funding.accountType,
        initialDeposit,
      })
      .subscribe({
        next: ({ user }) => {
          this.authService.login(String(user.id));
          this.onboardingData.clear();
          this.router.navigate(['/onboarding/confirmation']);
        },
      });
  }

  handlePrevious() {
    this.router.navigate(['/onboarding/funding']);
  }

  private maskNumber(value: string): string {
    const cleaned = value.replace(/\s/g, '');
    if (cleaned.length <= 4) {
      return cleaned;
    }
    return `••••••${cleaned.slice(-4)}`;
  }

}
