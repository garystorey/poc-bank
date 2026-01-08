import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { InputComponent, ButtonComponent } from '../../shared';


@Component({
  selector: 'app-login.page',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly api = inject(ApiService);

  readonly submitted = signal(false);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.controls.email.value?.trim().toLowerCase();
    if (!email) {
      this.form.controls.email.setErrors({ required: true });
      return;
    }

    this.api.listUsers({ pageSize: 50 }).subscribe({
      next: (response) => {
        const user = response.data.find((item) => item.email.toLowerCase() === email);
        if (!user) {
          this.form.controls.email.setErrors({ notFound: true });
          return;
        }
        this.authService.login(String(user.id));
        this.router.navigate(this.authService.accountRoute());
      },
      error: () => {
        this.form.controls.email.setErrors({ server: true });
      },
    });
  }
}
