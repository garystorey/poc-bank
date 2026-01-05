import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minimumAgeValidator(minAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;
    if (!raw) return null;

    const dt = new Date(raw);
    if (Number.isNaN(dt.getTime())) return { invalidDate: true };

    const today = new Date();
    const threshold = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );

    return dt > threshold ? { minAge: true } : null;
  };
}
