import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ServiceCardComponent } from '../servicecard/servicecard.component';
import { SubheadingComponent } from "../subheading/subheading.component";

@Component({
  selector: 'app-servicelist',
  standalone: true,
  imports: [ServiceCardComponent, SubheadingComponent],
  templateUrl: './servicelist.component.html',
  styleUrl: './servicelist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent {
  readonly services = [
    { title: 'Checking Accounts', description: 'No monthly fees, high interest rates, and unlimited transactions.' },
    { title: 'Savings Accounts', description: 'Earn more with our high-yield savings options.' },
    { title: 'Credit Cards', description: 'Rewards programs and low interest rates on purchases.' },
    { title: 'Loans & Mortgages', description: 'Competitive rates for personal loans, auto loans, and mortgages.' }
  ];
}
