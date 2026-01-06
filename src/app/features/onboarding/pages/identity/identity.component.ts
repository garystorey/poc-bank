import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateInPastValidator } from '../../../../shared/utils/date-past.validator';
import { Router } from '@angular/router';
import { US_STATES } from '../../../../shared/utils/usstates';
import { InputComponent } from "../../../../shared/ui/input/input.component";
import { SelectComponent } from "../../../../shared/ui/select/select.component";
import { ErrorSummaryMessages, SelectOption } from '../../../../types/types';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { ErrorSummaryComponent } from '../../../../shared/ui/errorsummary/errorsummary.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { minimumAgeValidator } from '../../../../shared/utils/age.validator';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, SelectComponent, ButtonComponent, StepperComponent, ErrorSummaryComponent],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly submitted = signal(false);
  readonly showSummary = computed(() => this.submitted() && this.form.invalid);
  readonly states: SelectOption[] = US_STATES;

  readonly form = this.fb.group({
    firstName: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    lastName: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    dateOfBirth: this.fb.nonNullable.control('', [
      Validators.required,
      dateInPastValidator,
      minimumAgeValidator(18),
    ]),
    socialSecurityNumber: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d{3}-\d{2}-\d{4}$/),
    ]),
    streetAddress: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(120),
    ]),
    city: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(80),
    ]),
    state: this.fb.nonNullable.control('', [Validators.required]),
    zipCode: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d{5}(-\d{4})?$/),
    ]),
  });
  readonly errorMessages: ErrorSummaryMessages = {
    firstName: {
      required: 'First Name is required.',
      _default: 'First Name is invalid.',
    },
    lastName: {
      required: 'Last Name is required.',
    },
    dateOfBirth: {
      required: 'Date of Birth is required.',
      dateNotInPast: 'Date of Birth must be in the past.',
      minAge: 'You must be at least 18 years old.',
      _default: 'Date of Birth is invalid.',
    },
    socialSecurityNumber: {
      required: 'Social Security Number is required.',
      pattern: 'Social Security Number must be in the format XXX-XX-XXXX.',
      _default: 'Social Security Number is invalid.',
    },
    streetAddress: {
      required: 'Street Address is required.',
      _default: 'Street Address is invalid.',
    },
    city: {
      required: 'City is required.',
      _default: 'City is invalid.',
    },
    state: {
      required: 'State is required.',
      _default: 'State is invalid.',
    },
    zipCode: {
      required: 'Zip Code is required.',
      pattern: 'Zip Code must be in the format XXXXX or XXXXX-XXXX.',
      _default: 'Zip Code is invalid.',
    }
  };

  shouldShowError(controlName: keyof IdentityComponent['form']['controls']): boolean {
    const c = this.form.controls[controlName];
    return c.invalid && (c.touched || this.submitted());
  }

  constructor() {
    const ssnControl = this.form.controls.socialSecurityNumber;

    ssnControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value == null) return;
        const formatted = this.formatSsn(value);
        if (formatted !== value) {
          ssnControl.setValue(formatted, { emitEvent: false });
        }
      });
  }

  handleSsnKeydown(event: KeyboardEvent): void {
    const allowedControlKeys = new Set([
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ]);

    if (event.ctrlKey || event.metaKey) return;

    const key = event.key;

    if (allowedControlKeys.has(key) || key === '-') return;

    if (/^\d$/.test(key)) {
      const input = event.target as HTMLInputElement;
      const selectionLength = (input.selectionEnd ?? 0) - (input.selectionStart ?? 0);
      const digits = input.value.replace(/\D/g, '');

      if (digits.length >= 9 && selectionLength === 0) {
        event.preventDefault();
      }

      return;
    }

    event.preventDefault();
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const identity = this.form.getRawValue();
    console.log('Identiy', identity);
    // this.onboardingService.createUser(identity).subscribe({
    //   next: () => {
    //     this.router.navigate(['/onboarding/funding']);
    //   },
    //   error: () => {
    //     // stay on page, show error
    //   }
    // });
    this.router.navigate(['/onboarding/funding']);

  }

  private formatSsn(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 9);

    const parts = [
      digits.slice(0, 3),
      digits.slice(3, 5),
      digits.slice(5, 9),
    ].filter(Boolean);

    return parts.join('-');
  }
}
