// input.component.ts
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ApplyAttrsDirective, AttrBag } from './apply-attrs.directive';

let nextUniqueId = 0;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, ApplyAttrsDirective],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly hostEl = inject(ElementRef<HTMLElement>);

  // Signal inputs
  readonly label = input.required<string>();
  readonly inputId = input<string>();
  readonly name = input<string>();
  readonly type = input<string>('text');
  readonly required = input<boolean>(false);
  readonly helpText = input<string>();
  readonly errorText = input<string>();
  readonly groupClass = input<string | string[] | Set<string> | { [klass: string]: unknown }>();
  readonly inputAttrs = input<AttrBag | null>(null);
  readonly keyDownHandler = input<((event: KeyboardEvent) => void) | null>(null);
  readonly submitted = input<boolean>(false);

  /**
   * Allow `aria-label="..."` on <app-input> to be forwarded to the native <input>.
   * This addresses the common case where callers set aria-label directly on the component.
   */
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });

  // ---- CVA state ----
  readonly value = signal('');
  readonly disabled = signal(false);

  private readonly autoId = `app-input-${++nextUniqueId}`;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    // Forward any static host classes (e.g., class="date-input") onto the native <input>.
    // This fixes the “class set on <app-input> doesn’t style the <input>” symptom.
    afterNextRender(() => {
      this.hostClasses.set(Array.from(this.hostEl.nativeElement.classList));
    });
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
  readonly resolvedId = computed(() => this.inputId() ?? this.name() ?? this.autoId);
  readonly resolvedName = computed(() => this.name() ?? '');
  readonly helpId = computed(() => `${this.resolvedId()}-help`);
  readonly errorId = computed(() => `${this.resolvedId()}-error`);

  readonly describedBy = computed(() => {
    if (this.showError()) return this.errorId();
    if (this.helpText()) return this.helpId();
    return null;
  });

  // ---- Host class forwarding ----
  private readonly hostClasses = signal<string[]>([]);
  readonly inputClass = computed(() => this.hostClasses());

  // ---- DOM events ----
  handleInput(raw: string): void {
    this.value.set(raw);
    this.onChange(raw);
  }

  handleKeyDown(event: KeyboardEvent): void {
    this.keyDownHandler()?.(event);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
