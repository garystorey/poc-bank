import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputComponent } from './input.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  template: `
    <form [formGroup]="form">
      <app-input
        label="Email"
        formControlName="email"
        helpText="Helpful text"
        errorText="Error text"
        [submitted]="submitted"
      />
    </form>
  `,
})
class TestHostComponent {
  submitted = false;
  form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}


describe('InputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders help text when not showing errors', () => {
    const help = fixture.nativeElement.querySelector('.form-description') as HTMLElement;
    expect(help?.textContent).toContain('Helpful text');
  });

  it('shows error text when submitted with invalid control', () => {
    fixture.componentInstance.submitted = true;
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.form-error') as HTMLElement;
    const help = fixture.nativeElement.querySelector('.form-description') as HTMLElement | null;

    expect(error?.textContent).toContain('Error text');
    expect(help).toBeNull();
  });
});
