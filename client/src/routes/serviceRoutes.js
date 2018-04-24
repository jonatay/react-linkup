import asyncComponent from '../views/components/common/async-component';

const SignInPage = asyncComponent(() =>
  import('../views/pages/service/sign-in-page')
);
const RegisterUserPage = asyncComponent(() =>
  import('../views/pages/service/register-user-page')
);

export const serviceRoutes = [
  { path: '/sign-in', component: SignInPage },
  { path: '/register', component: RegisterUserPage }
];
