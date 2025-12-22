export const ONBOARDING_ROUTES = [
  {
    path: 'onboarding',
    loadComponent: () =>
      import('../../layouts/onboarding.layout').then(m => m.OnboardingLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'step/step1' },
      // { path: 'step/:stepId',
      //   loadComponent: () =>
      //     import('./pages/onboarding-step/onboarding-step.component').then(m => m.OnboardingStepComponent)
      // }

    ]
  }
];
