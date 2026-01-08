import { Routes } from '@angular/router';
import { redirectAuthenticatedGuard } from '@shared/index';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'onboarding/identity',
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    canMatch: [redirectAuthenticatedGuard],
    loadComponent: () =>
      import('../../layouts/onboarding.layout').then(m => m.OnboardingLayoutComponent),
    children: [
      {
        path: 'identity',
        loadComponent: () =>
          import('./pages/identity/identity.component').then(m => m.IdentityComponent),
      },
      {
        path: 'funding',
        loadComponent: () =>
          import('./pages/funding/funding.component').then(m => m.FundingComponent),
      },
      {
        path: 'review',
        loadComponent: () =>
          import('./pages/review/review.component').then(m => m.ReviewComponent),
      },
      {
        path: 'confirmation',
        loadComponent: () =>
          import('./pages/confirmation/confirmation.component').then(m => m.ConfirmationComponent),
      },

      // Optional: default child redirect when someone hits /onboarding
      {
        path: '',
        redirectTo: 'identity',
        pathMatch: 'full',
      },
    ],
  },
];
