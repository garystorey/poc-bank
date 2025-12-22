import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturelistComponent } from './components/featurelist/featurelist.component';
import { ServiceListComponent } from './components/servicelist/servicelist.component';
import { TestimonialListComponent } from './components/testimoniallist/testimoniallist.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, FeaturelistComponent, ServiceListComponent, TestimonialListComponent],
  template: `
    <app-hero />
    <app-featurelist />
    <app-servicelist />
    <app-testimoniallist />
  `,
  styleUrl: './landing.component.scss'
})
export class LandingPageComponent {

}
