// input.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ApplyAttrsDirective, AttrBag } from './apply-attrs.directive';

let nextUniqueId = 0;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ApplyAttrsDirective],
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;

  @Input() inputId?: string;
  @Input() name?: string;

  @Input() type: string = 'text';
  @Input() required = false;

  @Input() helpText?: string;
  @Input() errorText?: string;

  /** Additional CSS classes to merge onto the outer .form-group wrapper */
  @Input() groupClass?: string | string[] | Set<string> | { [klass: string]: any };

  /** Arbitrary standard HTML / ARIA / data attributes to apply to the inner <input> */
  @Input() inputAttrs: AttrBag | null = null;

  @Input() submitted = false;

  // ---- CVA state ----
  value = '';
  disabled = false;

  private readonly autoId = `app-input-${++nextUniqueId}`;

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ---- ControlValueAccessor ----
  writeValue(val: unknown): void {
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
    return this.inputId ?? this.name ?? this.autoId;
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
  handleInput(raw: string): void {
    this.value = raw;
    this.onChange(raw);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
