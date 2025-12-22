import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimoniallistComponent } from './testimoniallist.component';

describe('TestimoniallistComponent', () => {
  let component: TestimoniallistComponent;
  let fixture: ComponentFixture<TestimoniallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimoniallistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimoniallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
