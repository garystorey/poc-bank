import { HomeLayoutComponent } from '@layouts/home.layout';

export const LANDING_ROUTES = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./landing.component').then((m) => m.LandingPageComponent),
      },
    ],
  }
]
