import { HomeLayoutComponent } from '@layouts/home.layout';
import { authGuard } from '@shared/guards/auth.guard';

export const ACCOUNT_ROUTES = [
  {
    path: 'accounts',
    canMatch: [authGuard],
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./accounts.component').then((m) => m.AccountsComponent),
      },
      {
        path: ':userId',
        loadComponent: () =>
          import('./accounts.component').then((m) => m.AccountsComponent),
      }

    ],
  }
]
