import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './stepper.component';


describe('StepperComponent', () => {
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
  });

  it('calculates progress width from the current step', () => {
    fixture.componentRef.setInput('currentStep', 3);
    fixture.detectChanges();

    const progress = fixture.nativeElement.querySelector('.track-progress') as HTMLElement;
    expect(progress.style.width).toContain('66');
  });
});
