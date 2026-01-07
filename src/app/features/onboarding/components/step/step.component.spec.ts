import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepComponent } from './step.component';


describe('StepComponent', () => {
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepComponent);
  });

  it('marks steps as completed when below the current step', () => {
    fixture.componentRef.setInput('stepNumber', 1);
    fixture.componentRef.setInput('currentStep', 2);
    fixture.componentRef.setInput('stepLabel', 'Personal Info');
    fixture.detectChanges();

    const stepEl = fixture.nativeElement.querySelector('.step') as HTMLElement;
    expect(stepEl.className).toContain('completed');
    expect(stepEl.textContent).toContain('Personal Info');
  });

  it('marks steps as active when on the current step', () => {
    fixture.componentRef.setInput('stepNumber', 2);
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();

    const stepEl = fixture.nativeElement.querySelector('.step') as HTMLElement;
    expect(stepEl.className).toContain('active');
  });
});
