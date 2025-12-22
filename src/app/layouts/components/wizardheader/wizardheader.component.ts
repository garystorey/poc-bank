import { Component, input } from '@angular/core';

@Component({
  selector: 'app-wizardheader',
  standalone: true,
  imports: [],
  templateUrl: './wizardheader.component.html',
  styleUrl: './wizardheader.component.scss'
})
export class WizardheaderComponent {

  title = input<string>('');
  description = input<string>('');

}
