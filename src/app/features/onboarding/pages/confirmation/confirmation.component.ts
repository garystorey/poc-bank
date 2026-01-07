import { ButtonComponent } from '../../../../shared';
import { RouterLink } from "@angular/router";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {}
