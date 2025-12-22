import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialcardComponent } from './testimonialcard.component';

describe('TestimonialcardComponent', () => {
  let component: TestimonialcardComponent;
  let fixture: ComponentFixture<TestimonialcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
