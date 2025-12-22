import { Routes } from '@angular/router';
import { LANDING_ROUTES } from './features/landing/landing.routes';
import { LOGIN_ROUTES } from './features/login/login.routes';

export const routes: Routes = [
  ...LANDING_ROUTES,
  ...LOGIN_ROUTES,
];
