import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { digitsOnly, moneyValidator } from '../../validators/money.validator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ACCOUNT_TYPES, DEPOSIT_METHODS, FUNDING_SOURCES } from '../../../../shared/utils/onboarding.utils';
import { InputComponent } from "../../../../shared/ui/input/input.component";
import { SelectComponent } from "../../../../shared/ui/select/select.component";
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { StepperComponent } from '../../components/stepper/stepper.component';
import { ErrorSummaryComponent } from '../../../../shared/ui/errorsummary/errorsummary.component';
import { ErrorSummaryMessages } from '../../../../types/types';

@Component({
  selector: 'app-funding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectComponent, ButtonComponent,StepperComponent,ErrorSummaryComponent],
  templateUrl: './funding.component.html',
  styleUrl: './funding.component.scss'
})


export class FundingComponent {

  readonly submitted = signal(false);

  readonly depositMethods = DEPOSIT_METHODS
  readonly fundingSources = FUNDING_SOURCES
  readonly accountTypes = ACCOUNT_TYPES

  readonly form = this.fb.group({
    initialAmount: this.fb.nonNullable.control('', [
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

   readonly errorMessages: ErrorSummaryMessages = {
    initialAmount: {
      required: 'Initial Deposit Amount is required.',
      money: 'Initial Deposit Amount must be a valid amount.',
      minlength: 'Initial Deposit Amount is required.',
      _default: 'Initial Deposit Amount is invalid.',
    },
    depositMethod: { required: 'Deposit Method is required.' },
    fundingSource: { required: 'Funding Source is required.' },
    routingNumber: {
      required: 'Routing Number is required.',
      digitsOnly: 'Routing Number must be 9 digits.',
      _default: 'Routing Number is invalid.',
    },
    accountNumber: {
      required: 'Account Number is required.',
      minlength: 'Account Number must be at least 4 digits.',
      maxlength: 'Account Number must be 17 digits or fewer.',
      pattern: 'Account Number must contain digits only.',
      _default: 'Account Number is invalid.',
    },
    accountType: { required: 'Account Type is required.' },
    bankName: {
      required: 'Bank Name is required.',
      maxlength: 'Bank Name must be 80 characters or fewer.',
      _default: 'Bank Name is invalid.',
    },
  };

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

  onSubmit(): void {
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

