import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SelectComponent } from './select.component';
import { SelectOption } from '../../../types';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent],
  template: `
    <form [formGroup]="form">
      <app-select
        label="Account"
        formControlName="account"
        [options]="options"
        helpText="Select an option"
        errorText="Selection required"
        [submitted]="submitted"
      />
    </form>
  `,
})
class TestHostComponent {
  submitted = false;
  options: SelectOption[] = [
    { value: 'checking', label: 'Checking' },
    { value: 'savings', label: 'Savings' },
  ];
  form = new FormGroup({
    account: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}


describe('SelectComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders options from inputs', () => {
    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toBe(2);
    expect(options[0].textContent).toContain('Checking');
  });

  it('shows error text when submitted with invalid control', () => {
    fixture.componentInstance.submitted = true;
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.form-error') as HTMLElement;
    expect(error?.textContent).toContain('Selection required');
  });
});
