// apply-attrs.directive.ts
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export type AttrValue = string | number | boolean | null | undefined;
export type AttrBag = Record<string, AttrValue>;

@Directive({
  selector: '[appApplyAttrs]',
  standalone: true,
})
export class ApplyAttrsDirective implements OnChanges {
  /**
   * Selector is `appApplyAttrs` (presence attribute on the element).
   * Input is `appAttrs`.
   */
  @Input() appAttrs: AttrBag | null = null;

  private previouslySet = new Set<string>();
  private previouslyAddedClassTokens = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!('appAttrs' in changes)) return;

    // Handle class specially so we do NOT overwrite other classes (e.g., ngClass, state classes).
    this.syncClassesFromBag();

    // Remove previously set non-class attributes that are no longer present.
    // IMPORTANT: iterate over a snapshot; do not mutate the Set while iterating it.
    for (const key of Array.from(this.previouslySet)) {
      if (key === 'class') continue;

      if (!this.appAttrs || !(key in this.appAttrs)) {
        this.renderer.removeAttribute(this.el.nativeElement, key);
        this.previouslySet.delete(key);
      }
    }

    if (!this.appAttrs) return;

    // Apply current non-class attributes.
    for (const [key, value] of Object.entries(this.appAttrs)) {
      if (key === 'class') continue;

      // null/undefined/false => remove
      if (value === null || value === undefined || value === false) {
        this.renderer.removeAttribute(this.el.nativeElement, key);
        this.previouslySet.delete(key);
        continue;
      }

      // true => boolean attribute presence
      const stringValue = value === true ? '' : String(value);
      this.renderer.setAttribute(this.el.nativeElement, key, stringValue);
      this.previouslySet.add(key);
    }
  }

  private syncClassesFromBag(): void {
    const raw = this.appAttrs?.['class'];

    // Remove previously added tokens if class is removed/falsey.
    if (raw === null || raw === undefined || raw === false) {
      for (const token of Array.from(this.previouslyAddedClassTokens)) {
        this.renderer.removeClass(this.el.nativeElement, token);
        this.previouslyAddedClassTokens.delete(token);
      }
      return;
    }

    // If class isn't provided in the bag, do nothing (do not disturb existing classes).
    if (!this.appAttrs || !('class' in this.appAttrs)) return;

    const nextTokens = this.parseClassTokens(raw);

    // Remove tokens we previously added that are no longer present.
    for (const token of Array.from(this.previouslyAddedClassTokens)) {
      if (!nextTokens.has(token)) {
        this.renderer.removeClass(this.el.nativeElement, token);
        this.previouslyAddedClassTokens.delete(token);
      }
    }

    // Add new tokens.
    for (const token of Array.from(nextTokens)) {
      if (!this.previouslyAddedClassTokens.has(token)) {
        this.renderer.addClass(this.el.nativeElement, token);
        this.previouslyAddedClassTokens.add(token);
      }
    }
  }

  private parseClassTokens(value: AttrValue): Set<string> {
    if (value === true) return new Set(); // boolean true with no tokens is effectively a no-op

    const str = String(value ?? '').trim();
    if (!str) return new Set();

    return new Set(
      str
        .split(/\s+/g)
        .map((t) => t.trim())
        .filter(Boolean),
    );
  }
}
