import { Component, input } from '@angular/core';
import { Feature } from '../../../../types/types';

@Component({
  selector: 'app-featurecard',
  standalone: true,
  imports: [],
  templateUrl: './featurecard.component.html',
  styleUrl: './featurecard.component.scss'
})
export class FeatureCardComponent {

  feature = input<Feature>({ icon: '', title: '', description: '' });

}
