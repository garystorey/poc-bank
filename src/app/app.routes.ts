import { Routes } from '@angular/router';
import { LANDING_ROUTES } from './features/landing/landing.routes';
import { LOGIN_ROUTES } from './features/login/login.routes';
import { ONBOARDING_ROUTES } from './features/onboarding/onboarding.routes';

export const routes: Routes = [
  ...LANDING_ROUTES,
  ...LOGIN_ROUTES,
  ...ONBOARDING_ROUTES
];
