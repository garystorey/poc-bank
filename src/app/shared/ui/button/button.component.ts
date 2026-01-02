import { ChangeDetectionStrategy, Component, computed, HostBinding, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'standard' | 'link';
export type ButtonSize = 'fixed' | 'standard' | 'full';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Signal inputs
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly variant = input<ButtonVariant>('standard');
  readonly size = input<ButtonSize>('standard');
  readonly class = input<string>();

  /** Host sizing flags (do NOT bind the whole class attribute) */
  @HostBinding('class.btn-full')
  get hostIsFull(): boolean {
    return this.size() === 'full';
  }

  @HostBinding('class.btn-fixed')
  get hostIsFixed(): boolean {
    return this.size() === 'fixed';
  }

  readonly variantClass = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'link':
        return 'btn-link';
      default:
        return 'btn-standard';
    }
  });

  readonly sizeClass = computed(() => {
    switch (this.size()) {
      case 'fixed':
        return 'btn-fixed';
      case 'full':
        return 'btn-full';
      default:
        return null;
    }
  });

  readonly buttonClassString = computed(() => {
    return ['btn', this.variantClass(), this.sizeClass(), this.class()].filter(Boolean).join(' ');
  });
}
