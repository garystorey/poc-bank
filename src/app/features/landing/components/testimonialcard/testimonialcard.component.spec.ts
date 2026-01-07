import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCardComponent } from './testimonialcard.component';


describe('TestimonialCardComponent', () => {
  let fixture: ComponentFixture<TestimonialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialCardComponent);
  });

  it('renders testimonial content', () => {
    fixture.componentRef.setInput('testimonial', {
      name: 'Taylor',
      position: 'Designer',
      feedback: 'Great service.',
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Taylor');
    expect(text).toContain('Designer');
    expect(text).toContain('Great service.');
  });
});
