import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '@shared/index';
import { StepperComponent } from '../../components/stepper/stepper.component';

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

  // Placeholder data - in a real app this would come from a service
  user = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  };

  deposit = {
    accountType: 'Checking',
    bankName: 'POC Bank',
    routingNumber: '••••••1234',
    accountNumber: '••••••5678',
    initialAmount: '$500.00',
    fundingSource: 'External Bank Transfer',
    depositMethod: 'ACH Transfer'
  };

  handleCreateAccount() {
    // Logic to create account goes here
    console.log('Account creation initiated');
    this.router.navigate(['/onboarding/confirmation']);
  }

  handlePrevious() {
    this.router.navigate(['/onboarding/funding']);
  }

}
