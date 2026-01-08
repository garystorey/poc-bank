import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestimonialCardComponent } from '../testimonialcard/testimonialcard.component';
import { SubheadingComponent } from "../subheading/subheading.component";
import { Testimonial } from '../../../../types';

@Component({
  selector: 'app-testimoniallist',
  standalone: true,
  imports: [TestimonialCardComponent, SubheadingComponent],
  templateUrl: './testimoniallist.component.html',
  styleUrl: './testimoniallist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialListComponent {
  readonly testimonials: Testimonial[] = [
    {
      name: "John Smith",
      position: "Marketing Director",
      feedback: "Switching to POC Bank was the best financial decision I've made. Their customer service is exceptional and their online banking platform is incredibly user-friendly.",
    },
    {
      name: "Sarah Johnson",
      position: "Financial Analyst",
      feedback: "The interest rates on their savings accounts are unmatched. I've been able to grow my savings significantly faster than at my previous bank.",
    },
    {
      name: "Michael Brown",
      position: "Small Business Owner",
      feedback: "As a small business owner, I appreciate how POC Bank understands the unique needs of entrepreneurs. Their business banking solutions have helped my company thrive.",
    }
  ];
}
