import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ErrorSummaryComponent } from './errorsummary.component';


describe('ErrorSummaryComponent', () => {
  let fixture: ComponentFixture<ErrorSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorSummaryComponent);
  });

  it('shows validation messages when form is invalid', () => {
    const form = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

    fixture.componentRef.setInput('control', form);
    fixture.componentRef.setInput('show', true);
    fixture.componentRef.setInput('focusOnShow', false);
    fixture.componentRef.setInput('messages', {
      name: { required: 'Name is required.' },
    });

    fixture.detectChanges();

    const summary = fixture.nativeElement.querySelector('.error-summary') as HTMLElement;
    const message = fixture.nativeElement.querySelector('li a') as HTMLElement;

    expect(summary).not.toBeNull();
    expect(message.textContent).toContain('Name is required.');
  });

  it('hides when show is false', () => {
    const form = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

    fixture.componentRef.setInput('control', form);
    fixture.componentRef.setInput('show', false);
    fixture.componentRef.setInput('messages', {
      name: { required: 'Name is required.' },
    });

    fixture.detectChanges();

    const summary = fixture.nativeElement.querySelector('.error-summary') as HTMLElement | null;
    expect(summary).toBeNull();
  });
});
