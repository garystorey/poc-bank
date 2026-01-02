import { HomeLayoutComponent } from '../../layouts/home.layout';

export const ACCOUNT_ROUTES = [
  {
    path: 'accounts',
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
