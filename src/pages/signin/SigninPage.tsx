import { SigninForm } from './SigninForm/SigninForm';

export const LoginPage = () => {
  return (
    <div className="page">
      <h1 className="page__title">Sign in to your account</h1>
      <SigninForm />
      <p>
        No account?
        <a href="">Sign up!</a>
      </p>
    </div>
  );
};
