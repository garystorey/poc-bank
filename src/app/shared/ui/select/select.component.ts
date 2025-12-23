// select.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ApplyAttrsDirective, AttrBag } from '../input/apply-attrs.directive'; // adjust path if needed
import { SelectOption } from '../../../types/types';


let nextUniqueId = 0;

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ApplyAttrsDirective],
  templateUrl: './select.component.html',
})
export class SelectComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;

  /**
   * Mirror app-input: do NOT use `id` as an @Input (host id collision).
   * Use `selectId` for the internal <select> id.
   */
  @Input() selectId?: string;
  @Input() name?: string;

  @Input() required = false;

  @Input() helpText?: string;
  @Input() errorText?: string;

  /** Additional CSS classes to merge onto the outer .form-group wrapper */
  @Input() groupClass?: string | string[] | Set<string> | { [klass: string]: any };

  /** Arbitrary standard HTML / ARIA / data attributes to apply to the inner <select> */
  @Input() selectAttrs: AttrBag | null = null;

  /** Options to render */
  @Input() options: SelectOption[] = [];

  /** Mirrors your original logic: invalid && (touched || submitted) */
  @Input() submitted = false;

  // ---- CVA state ----
  value: string = '';
  disabled = false;

  private readonly autoId = `app-select-${++nextUniqueId}`;

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ---- ControlValueAccessor ----
  writeValue(val: unknown): void {
    // Keep as string for <select> value binding
    this.value = (val ?? '') as string;
  }

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ---- Form control + error state ----
  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  get showError(): boolean {
    const c = this.control;
    return !!c && c.invalid && (c.touched || this.submitted);
  }

  // ---- A11y ids ----
  get resolvedId(): string {
    return this.selectId ?? this.name ?? this.autoId;
  }

  get resolvedName(): string {
    return this.name ?? '';
  }

  get helpId(): string {
    return `${this.resolvedId}-help`;
  }

  get errorId(): string {
    return `${this.resolvedId}-error`;
  }

  get describedBy(): string | null {
    if (this.showError) return this.errorId;
    if (this.helpText) return this.helpId;
    return null;
  }

  // ---- DOM events ----
  handleChange(raw: string): void {
    this.value = raw;
    this.onChange(raw);
  }

  handleBlur(): void {
    this.onTouched();
  }

  trackByValue(_: number, opt: SelectOption): string | number {
    return opt.value;
  }
}
