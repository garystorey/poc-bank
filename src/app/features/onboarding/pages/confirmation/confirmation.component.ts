import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

}
