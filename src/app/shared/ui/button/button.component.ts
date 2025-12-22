import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Output,
  input,
} from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})

export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);

  @Output() clicked = new EventEmitter<void>();

  @HostBinding('class') get hostClass() {
    return `btn btn-${this.variant()} btn-${this.size()}`;
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.clicked.emit();
  }
}
