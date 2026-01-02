import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  user = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'
  }

  deposit = {
    accountType : 'Checking',
    accountNumber: '987654321',
    routingNumber: '111000025',
    bankName: 'Bank of Examples',
    initialAmount: 500,
    fundingSource: 'Checking Account',
    depositMethod: 'Electronic Transfer',
  }
}
