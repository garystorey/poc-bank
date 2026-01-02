import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
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
}
