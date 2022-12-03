import { ReactComponent as RSSchoolLogo } from '../../assets/img/rs_school_js.svg';
import { ReactComponent as GithubLogoUser } from '../../assets/img/github-svgrepo-com.svg';
import { ReactComponent as Copyright } from '../../assets/img/copyright-svgrepo-com.svg';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <a className="school" href="https://rs.school/" target="_blank" rel="noreferrer">
        <RSSchoolLogo className="school__image" />
      </a>
      <div className="github">
        <a
          className="github__link"
          href="https://github.com/svr-by"
          target="_blank"
          rel="me noreferrer"
        >
          <GithubLogoUser className="github__image" />
          <p className="github__text">svr-by</p>
        </a>
        <a
          className="github__link"
          href="https://github.com/Denis169"
          target="_blank"
          rel="me noreferrer"
        >
          <GithubLogoUser className="github__image" />
          <p className="github__text">Denis169</p>
        </a>
        <a
          className="github__link"
          href="https://github.com/BromBom"
          target="_blank"
          rel="me noreferrer"
        >
          <GithubLogoUser className="github__image" />
          <p className="github__text">BromBom</p>
        </a>
      </div>
      <div className="copyright">
        <Copyright className="copyright__image" />
        <p className="copyright__text">2022. React 2022Q3</p>
      </div>
    </footer>
  );
};
