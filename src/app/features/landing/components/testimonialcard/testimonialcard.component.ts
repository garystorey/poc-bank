import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Testimonial } from '../../../../types';

@Component({
  selector: 'app-testimonialcard',
  standalone: true,
  imports: [],
  templateUrl: './testimonialcard.component.html',
  styleUrl: './testimonialcard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCardComponent {
  readonly testimonial = input<Testimonial>({
    name: '',
    position: '',
    feedback: '',
  });
}
