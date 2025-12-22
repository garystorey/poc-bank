import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateInPastValidator } from '../../validators/date-past.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss'
})

export class IdentityComponent {

  readonly submitted = signal(false);
  readonly showSummary = computed(() => this.submitted() && this.form.invalid);
  private readonly router: Router = new Router;


  readonly states = [
    { code: '', name: 'Select State' },
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'DC', name: 'District of Columbia' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
  ] as const;

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
    // this.signupService.createUser(payload).subscribe({
    //   next: () => {
    //     this.router.navigate(['/signup/success']);
    //   },
    //   error: () => {
    //     // stay on page, show error
    //   }
    // });

    this.router.navigate(['/onboarding/funding']);

  }
}
