import { AbstractControl, ValidationErrors } from "@angular/forms";

export function dateInPastValidator(control: AbstractControl): ValidationErrors | null {
  const raw = control.value;
  if (!raw) return null;

  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return { invalidDate: true };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dt.setHours(0, 0, 0, 0);

  return dt >= today ? { dateNotInPast: true } : null;
}
