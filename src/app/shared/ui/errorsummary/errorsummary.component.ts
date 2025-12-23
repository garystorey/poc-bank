// error-summary.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { ErrorItem, ErrorSummaryMessages } from '../../../types/types';


@Component({
  selector: 'app-error-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errorsummary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorSummaryComponent {
  /**
   * Root form control (usually your FormGroup).
   */
  @Input({ required: true }) control!: AbstractControl;

  /**
   * Whether the summary should be visible (e.g., submitted && form.invalid).
   */
  @Input({ required: true }) show = false;

  /**
   * Messages keyed by control path (e.g. "routingNumber", "bank.accountNumber", "items.0.name").
   * Value can be a string, a per-error-key map, or a function.
   */
  @Input({ required: true }) messages: ErrorSummaryMessages = {};

  /**
   * If true, focuses the summary container when it becomes visible.
   */
  @Input() focusOnShow = true;

  /**
   * If you want a different anchor id than the control path, provide a map here.
   * Example: { routingNumber: 'routing-number-input' }
   */
  @Input() anchorIds: Record<string, string> = {};

  @ViewChild('summary', { static: false }) summaryEl?: ElementRef<HTMLElement>;

  private wasShown = false;

  get items(): ErrorItem[] {
    if (!this.control) return [];
    return this.buildItems(this.control, '');
  }

  get visible(): boolean {
    return this.show && this.items.length > 0;
  }

  ngAfterViewChecked(): void {
    if (!this.focusOnShow) return;

    // focus only on the transition hidden -> visible
    if (this.visible && !this.wasShown) {
      this.wasShown = true;
      queueMicrotask(() => this.summaryEl?.nativeElement.focus());
      return;
    }

    if (!this.visible) {
      this.wasShown = false;
    }
  }

  /**
   * Click handler for summary links. Tries to focus the input by id.
   * Works best if your inputs have id equal to the control name/path (or supplied via anchorIds).
   */
  focusField(anchorId: string): void {
    const el = document.getElementById(anchorId) as HTMLElement | null;
    if (!el) return;

    // Focus input/select/textarea; also scroll into view
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.focus?.();
  }

  private buildItems(root: AbstractControl, basePath: string): ErrorItem[] {
    // We only include controls that:
    // 1) are invalid
    // 2) have a configured message entry (by path)
    // 3) are leaf controls OR groups/arrays with group-level errors keyed in messages
    const items: ErrorItem[] = [];

    // Include group-level / array-level errors if the path itself is configured
    if (basePath && root.invalid && this.hasMessageForPath(basePath)) {
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

        // Recurse first
        items.push(...this.buildItems(child, childPath));

        // If leaf control and invalid and configured, include it
        if (!(child instanceof FormGroup) && !(child instanceof FormArray)) {
          if (child.invalid && this.hasMessageForPath(childPath)) {
            const msg = this.resolveMessage(childPath, child);
            if (msg) {
              items.push({
                path: childPath,
                message: msg,
                anchorId: this.anchorIds[childPath] ?? childPath,
              });
            }
          }
        }
      }
    } else if (root instanceof FormArray) {
      for (let i = 0; i < root.controls.length; i++) {
        const child = root.controls[i];
        const childPath = basePath ? `${basePath}.${i}` : `${i}`;
        items.push(...this.buildItems(child, childPath));

        if (!(child instanceof FormGroup) && !(child instanceof FormArray)) {
          if (child.invalid && this.hasMessageForPath(childPath)) {
            const msg = this.resolveMessage(childPath, child);
            if (msg) {
              items.push({
                path: childPath,
                message: msg,
                anchorId: this.anchorIds[childPath] ?? childPath,
              });
            }
          }
        }
      }
    }

    // Dedupe by path (can happen if a control is visited as a group-level + leaf-level)
    const seen = new Set<string>();
    return items.filter((x) => (seen.has(x.path) ? false : (seen.add(x.path), true)));
  }

  private hasMessageForPath(path: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.messages, path);
  }

  private resolveMessage(path: string, control: AbstractControl): string {
    const def = this.messages[path];
    if (!def) return '';

    const errors = control.errors ?? null;

    if (typeof def === 'string') {
      return def;
    }

    if (typeof def === 'function') {
      return def(errors, control) ?? '';
    }

    // def is a per-error map
    if (!errors) {
      // if it is invalid for some reason but errors is null, try default key
      return def['_default'] ?? 'This field is invalid.';
    }

    // Priority order (tune if you like)
    const priority = [
      'required',
      'email',
      'pattern',
      'digitsOnly',
      'money',
      'min',
      'max',
      'minlength',
      'maxlength',
    ];

    for (const key of priority) {
      if (errors[key] && def[key]) return def[key];
    }

    // Otherwise, first matching key we have a message for
    for (const key of Object.keys(errors)) {
      if (def[key]) return def[key];
    }

    // Fallback if provided
    return def['_default'] ?? 'This field is invalid.';
  }
}
