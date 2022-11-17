import './Button.scss';

export const Button = ({ naming }: { naming: string }) => {
  return <button className="button">{naming}</button>;
};
