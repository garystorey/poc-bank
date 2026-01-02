import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-onboardingheader',
  standalone: true,
  imports: [],
  templateUrl: './onboardingheader.component.html',
  styleUrl: './onboardingheader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingheaderComponent {}
