// select.component.ts
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ApplyAttrsDirective, AttrBag } from '../input/apply-attrs.directive';
import { SelectOption } from '../../../types';

let nextUniqueId = 0;

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, ApplyAttrsDirective],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  readonly ngControl = inject(NgControl, { optional: true, self: true });

  // Signal inputs
  readonly label = input.required<string>();
  readonly selectId = input<string|number>();
  readonly name = input<string>();
  readonly required = input<boolean>(false);
  readonly helpText = input<string>();
  readonly errorText = input<string>();
  readonly groupClass = input<string | string[] | Set<string> | { [klass: string]: unknown }>();
  readonly selectAttrs = input<AttrBag | null>(null);
  readonly options = input<SelectOption[]>([]);
  readonly submitted = input<boolean>(false);
  // ---- CVA state ----
  readonly value = signal('');
  readonly disabled = signal(false);

  readonly selected = computed<string>(() => {
    const val = this.value();
    const selectedOption = this.options().find(opt => opt.value === val);
    return selectedOption ? String(selectedOption.value) : '';
  });

  private readonly autoId = `app-select-${++nextUniqueId}`;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ---- ControlValueAccessor ----
  writeValue(val: unknown): void {
    this.value.set((val ?? '') as string);
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
    this.disabled.set(isDisabled);
  }

  // ---- Form control + error state ----
  readonly control = computed<AbstractControl | null>(() => this.ngControl?.control ?? null);

  readonly showError = computed(() => {
    const c = this.control();
    return !!c && c.invalid && (c.touched || this.submitted());
  });

  // ---- A11y ids ----
  readonly resolvedId = computed(() => this.selectId() ?? this.name() ?? this.autoId);
  readonly resolvedName = computed(() => this.name() ?? '');
  readonly helpId = computed(() => `${this.resolvedId()}-help`);
  readonly errorId = computed(() => `${this.resolvedId()}-error`);

  readonly describedBy = computed(() => {
    if (this.showError()) return this.errorId();
    if (this.helpText()) return this.helpId();
    return null;
  });

  // ---- DOM events ----
  handleChange(raw: string): void {
    this.value.set(raw);
    this.onChange(raw);
  }

  handleBlur(): void {
    this.onTouched();
  }

  trackByValue(_: number, opt: SelectOption): string | number {
    return opt.value;
  }
}
