import { Component, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { digitsOnly, moneyValidator } from '../../validators/money.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funding',
  standalone: true,
  imports: [],
  templateUrl: './funding.component.html',
  styleUrl: './funding.component.scss'
})


export class FundingComponent {

  readonly depositMethods = [
    { value: '', label: 'Select Method' },
    { value: 'check', label: 'Check' },
    { value: 'ach', label: 'ACH' },
    { value: 'wire', label: 'Wire' },
    { value: 'cash', label: 'Cash' },
  ] as const;

  readonly fundingSources = [
    { value: '', label: 'Select Source' },
    { value: 'payroll', label: 'Payroll' },
    { value: 'savings', label: 'Savings' },
    { value: 'external', label: 'External Account' },
    { value: 'other', label: 'Other' },
  ] as const;

  readonly accountTypes = [
    { value: '', label: 'Select Type' },
    { value: 'checking', label: 'Checking' },
    { value: 'savings', label: 'Savings' },
  ] as const;

  readonly submitted = signal(false);

  readonly form = this.fb.group({
    initialDepositAmount: this.fb.nonNullable.control('', [
      Validators.required,
      moneyValidator,
      Validators.minLength(1),
    ]),
    depositMethod: this.fb.nonNullable.control('', [Validators.required]),
    fundingSource: this.fb.nonNullable.control('', [Validators.required]),
    routingNumber: this.fb.nonNullable.control('', [
      Validators.required,
      digitsOnly(9),
    ]),
    accountNumber: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(17),
      Validators.pattern(/^\d+$/),
    ]),
    accountType: this.fb.nonNullable.control('', [Validators.required]),
    bankName: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(80),
    ]),
  });

  readonly showSummary = computed(() => this.submitted() && this.form.invalid);

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  shouldShowError(controlName: keyof FundingComponent['form']['controls']): boolean {
    const c = this.form.controls[controlName];
    return c.invalid && (c.touched || this.submitted());
  }

  onPrevious(): void {
    this.router.navigate(['/onboarding']);
  }

  onNext(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const deposit = this.form.getRawValue();
    console.log('Deposit', deposit);

    // this.signupService.fundAccount(deposit).subscribe({
    //   next: () => {
    //     this.router.navigate(['/onboarding/review']);
    //   },
    //   error: () => {
    //     // stay on page, show error
    //   }
    // });

    // Update to your real route
    this.router.navigate(['/onboarding/review']);
  }
}

