import { OnboardingLayoutComponent } from "../../layouts/onboarding.layout";
import { redirectAuthenticatedGuard } from "../../shared/guards/auth.guard";

export const LOGIN_ROUTES = [
{
    path: "login",
    canMatch: [redirectAuthenticatedGuard],
    component: OnboardingLayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./loginpage.component").then((m) => m.LoginPageComponent),
      },
    ],
  }
];
