// error-summary.component.ts (changes only)
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  inject,
  OnChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type ErrorSummaryMessage =
  | string
  | Record<string, string>
  | ((errors: ValidationErrors | null, control: AbstractControl) => string);

export type ErrorSummaryMessages = Record<string, ErrorSummaryMessage>;

type ErrorItem = { path: string; message: string; anchorId: string };

@Component({
  selector: 'app-error-summary',
  standalone: true,
  imports: [],
  templateUrl: './errorsummary.component.html',
  styleUrls: ['./errorsummary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorSummaryComponent implements OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) control!: AbstractControl;
  @Input({ required: true }) show = false;
  @Input({ required: true }) messages: ErrorSummaryMessages = {};
  @Input() anchorIds: Record<string, string> = {};
  @Input() focusOnShow = true;

  /**
   * Change this on every submit attempt to force the summary to recompute.
   */
  @Input() refreshToken: unknown;

  @ViewChild('summary', { static: false }) summaryEl?: ElementRef<HTMLElement>;

  items: ErrorItem[] = [];
  private wasShown = false;
  private bound = false;

  get visible(): boolean {
    return this.show && this.items.length > 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Ensure we are listening to reactive-form changes once
    if (changes['control'] && this.control && !this.bound) {
      this.bound = true;

      merge(this.control.valueChanges, this.control.statusChanges)
        .pipe(startWith(null), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.recompute();
        });
    }

    // Force recompute whenever the parent "ticks" (e.g., on submit)
    if (changes['refreshToken']) {
      this.recompute();
    }

    // Also recompute if show toggles
    if (changes['show']) {
      this.recompute();
    }
  }

  ngAfterViewChecked(): void {
    if (!this.focusOnShow) return;

    if (this.visible && !this.wasShown) {
      this.wasShown = true;
      queueMicrotask(() => this.summaryEl?.nativeElement.focus());
      return;
    }
    if (!this.visible) this.wasShown = false;
  }

  focusField(anchorId: string): void {
    const el = document.getElementById(anchorId) as HTMLElement | null;
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.focus?.();
  }

  private recompute(): void {
    if (!this.control) return;
    this.items = this.buildItems(this.control, '');
    this.cdr.markForCheck();
  }

  private buildItems(root: AbstractControl, basePath: string): ErrorItem[] {
    const items: ErrorItem[] = [];

    // Leaf controls and/or group-level errors (when configured)
    if (basePath && root.invalid && Object.prototype.hasOwnProperty.call(this.messages, basePath)) {
      const msg = this.resolveMessage(basePath, root);
      if (msg) {
        items.push({
          path: basePath,
          message: msg,
          anchorId: this.anchorIds[basePath] ?? basePath,
        });
      }
    }

    if (root instanceof FormGroup) {
      for (const key of Object.keys(root.controls)) {
        const child = root.controls[key];
        const childPath = basePath ? `${basePath}.${key}` : key;
        items.push(...this.buildItems(child, childPath));
      }
    } else if (root instanceof FormArray) {
      for (let i = 0; i < root.controls.length; i++) {
        const child = root.controls[i];
        const childPath = basePath ? `${basePath}.${i}` : `${i}`;
        items.push(...this.buildItems(child, childPath));
      }
    }

    // Dedupe
    const seen = new Set<string>();
    return items.filter((x) => (seen.has(x.path) ? false : (seen.add(x.path), true)));
  }

  private resolveMessage(path: string, control: AbstractControl): string {
    const def = this.messages[path];
    if (!def) return '';

    const errors = control.errors ?? null;

    if (typeof def === 'string') return def;
    if (typeof def === 'function') return def(errors, control) ?? '';

    if (!errors) return def['_default'] ?? '';

    const priority = ['required', 'pattern', 'digitsOnly', 'money', 'minlength', 'maxlength', 'min', 'max'];
    for (const k of priority) {
      if (errors[k] && def[k]) return def[k];
    }
    for (const k of Object.keys(errors)) {
      if (def[k]) return def[k];
    }
    return def['_default'] ?? '';
  }
}
