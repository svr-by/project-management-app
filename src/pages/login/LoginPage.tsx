import { LoginForm } from './LoginForm/LoginForm';

export const LoginPage = () => {
  return (
    <div className="page">
      <h1 className="page__title">Sign in to your account</h1>
      <LoginForm />
      <p>
        No account?
        <a href="">Sign up!</a>
      </p>
    </div>
  );
};
