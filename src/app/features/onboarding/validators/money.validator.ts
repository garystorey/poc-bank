import { AbstractControl, ValidationErrors } from "@angular/forms";

export function moneyValidator(control: AbstractControl): ValidationErrors | null {
  const raw = String(control.value ?? '').trim();
  if (!raw) return null; // required handled separately
  // Allow 0 or greater, up to 2 decimals
  return /^\d+(\.\d{1,2})?$/.test(raw) ? null : { money: true };
}

export function digitsOnly(len: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = String(control.value ?? '').trim();
    if (!raw) return null; // required handled separately
    return new RegExp(`^\\d{${len}}$`).test(raw) ? null : { digitsOnly: { len } };
  };
}
