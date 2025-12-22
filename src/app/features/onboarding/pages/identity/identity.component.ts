import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateInPastValidator } from '../../validators/date-past.validator';
import { Router } from '@angular/router';
import { UsState } from '../../../../types/types';
import { US_STATES } from '../../../../shared/utils/usstates';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss'
})

export class IdentityComponent {

  private readonly router: Router = new Router;

  readonly submitted = signal(false);
  readonly showSummary = computed(() => this.submitted() && this.form.invalid);
  readonly states: UsState[] = US_STATES

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

  constructor(private readonly fb: FormBuilder) {}

  shouldShowError(controlName: keyof IdentityComponent['form']['controls']): boolean {
    const c = this.form.controls[controlName];
    return c.invalid && (c.touched || this.submitted());
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
}
