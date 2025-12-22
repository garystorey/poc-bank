import { Component, input } from '@angular/core';
import { Testimonial } from '../../../../shared/types/types';

@Component({
  selector: 'app-testimonialcard',
  standalone: true,
  imports: [],
  templateUrl: './testimonialcard.component.html',
  styleUrl: './testimonialcard.component.scss'
})
export class TestimonialCardComponent {

  testimonial = input<Testimonial>({
    name: '',
    position: '',
    feedback: '',
  });
}
