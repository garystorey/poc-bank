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
   * IMPORTANT:
   * - Selector is `appApplyAttrs` (presence attribute on the element).
   * - Input is `appAttrs` (different name), so adding `appApplyAttrs` never causes a type assignment error.
   */
  @Input() appAttrs: AttrBag | null = null;

  private previouslySet = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!('appAttrs' in changes)) return;

    // Remove previously set attributes that are no longer present
    for (const key of this.previouslySet) {
      if (!this.appAttrs || !(key in this.appAttrs)) {
        this.renderer.removeAttribute(this.el.nativeElement, key);
        this.previouslySet.delete(key);
      }
    }

    if (!this.appAttrs) return;

    // Apply current attributes
    for (const [key, value] of Object.entries(this.appAttrs)) {
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
}
