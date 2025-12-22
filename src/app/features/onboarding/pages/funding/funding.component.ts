import { Component, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { digitsOnly, moneyValidator } from '../../validators/money.validator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ACCOUNT_TYPES, DEPOSIT_METHODS, FUNDING_SOURCES } from '../../../../shared/utils/onboarding.utils';

@Component({
  selector: 'app-funding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funding.component.html',
  styleUrl: './funding.component.scss'
})


export class FundingComponent {

  readonly submitted = signal(false);

  readonly depositMethods = DEPOSIT_METHODS
  readonly fundingSources = FUNDING_SOURCES
  readonly accountTypes = ACCOUNT_TYPES

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

    // this.onboardingService.fundAccount(deposit).subscribe({
    //   next: () => {
    //     this.router.navigate(['/onboarding/review']);
    //   },
    //   error: () => {
    //     // stay on page, show error
    //   }
    // });

    this.router.navigate(['/onboarding/review']);
  }
}

