import { OnboardingLayoutComponent } from "../../layouts/onboarding.layout";

export const LOGIN_ROUTES = [
{
    path: "login",
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
