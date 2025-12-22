import { Component } from '@angular/core';
import { FeatureCardComponent } from '../featurecard/featurecard.component';
import { SubheadingComponent } from '../subheading/subheading.component';

@Component({
  selector: 'app-featurelist',
  standalone: true,
  imports: [FeatureCardComponent, SubheadingComponent],
  templateUrl: './featurelist.component.html',
  styleUrl: './featurelist.component.scss'
})
export class FeaturelistComponent {

  features = [
    {
      icon: 'fa-shield-alt',
      title: 'Secure Banking',
      description: 'Military-grade encryption and multi-factor authentication to keep your finances safe.'
    },
    {
      icon: 'fa-mobile-alt',
      title: 'Digital Banking',
      description: 'Manage your accounts anytime, anywhere with our award-winning mobile app.'
    },
    {
      icon: 'fa-headset',
      title: '24/7 Support',
      description: 'Our dedicated support team is here to help you around the clock.'
    }
  ];
}
