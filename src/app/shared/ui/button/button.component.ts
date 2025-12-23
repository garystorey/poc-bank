import { Component, HostBinding, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'standard' | 'link';
export type ButtonSize = 'fixed' | 'standard' | 'full';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  @Input() variant: ButtonVariant = 'standard';
  @Input() size: ButtonSize = 'standard';

  /** Optional extra classes applied to the inner <button> */
  @Input() class?: string;

  /** Host sizing flags (do NOT bind the whole class attribute) */
  @HostBinding('class.btn-full')
  get hostIsFull(): boolean {
    return this.size === 'full';
  }

  @HostBinding('class.btn-fixed')
  get hostIsFixed(): boolean {
    return this.size === 'fixed';
  }

  get variantClass(): string {
    switch (this.variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'link':
        return 'btn-link';
      default:
        return 'btn-standard';
    }
  }

  get sizeClass(): string | null {
    switch (this.size) {
      case 'fixed':
        return 'btn-fixed';
      case 'full':
        return 'btn-full';
      default:
        return null;
    }
  }

  get buttonClassString(): string {
    return ['btn', this.variantClass, this.sizeClass, this.class].filter(Boolean).join(' ');
  }
}
