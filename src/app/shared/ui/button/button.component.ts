import {
  Component,
  HostBinding,
  input,
  output,
} from '@angular/core';

type ButtonVariant = 'primary' | 'secondary';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})

export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);

  clicked = output<void>();

  @HostBinding('class') get hostClass() {
    return `btn btn-${this.variant()}`;
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.clicked.emit();

  }
}
