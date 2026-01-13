import { RouterLink } from "@angular/router";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@shared/index';
import { StepperComponent } from "../../components/stepper/stepper.component";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ButtonComponent, RouterLink, StepperComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {}
