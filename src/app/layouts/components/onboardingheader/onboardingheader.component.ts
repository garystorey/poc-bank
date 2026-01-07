import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-onboardingheader',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './onboardingheader.component.html',
  styleUrl: './onboardingheader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingheaderComponent {}
