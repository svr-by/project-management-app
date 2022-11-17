import { SignupForm } from './SignupForm/SignupForm';

export const SignupPage = () => {
  return (
    <div className="page">
      <h1 className="page__title">Create account</h1>
      <SignupForm />
      <p>
        Already have an account?
        <a href="">Sing in</a>
      </p>
    </div>
  );
};
