import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialListComponent } from './testimoniallist.component';


describe('TestimonialListComponent', () => {
  let fixture: ComponentFixture<TestimonialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialListComponent);
    fixture.detectChanges();
  });

  it('renders testimonial cards for each testimonial', () => {
    const cards = fixture.nativeElement.querySelectorAll('.testimonial-card');
    expect(cards.length).toBe(3);
  });
});
