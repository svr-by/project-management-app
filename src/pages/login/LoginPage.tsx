import { LoginForm } from './LoginForm/LoginForm';
import './LoginPage.scss';

export const LoginPage = () => {
  return (
    <div className="login">
      <h1 className="login__title">Create account</h1>
      <LoginForm />
      <p className="login__question">
        Already have an account?
        <a href="">Sing in</a>
      </p>
    </div>
  );
};
