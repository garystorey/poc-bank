import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login.page',
  standalone: true,
  imports: [],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
