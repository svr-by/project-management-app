import RSSchoolLogo from '../../assets/img/rs_school_js.svg';
import GithubLogoUser from '../../assets/img/github-svgrepo-com.svg';
import Copyright from '../../assets/img/copyright-svgrepo-com.svg';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <a className="school" href="https://rs.school/" target="_blank" rel="noreferrer">
        <img className="school__image" src={RSSchoolLogo} alt="RS Logo" />
      </a>
      <div className="github">
        <a
          className="github__link"
          href="https://github.com/svr-by"
          target="_blank"
          rel="me noreferrer"
        >
          <img className="github__image" src={GithubLogoUser} alt="GithubLogoUser" />
          <p className="github__text">svr-by</p>
        </a>
        <a
          className="github__link"
          href="https://github.com/Denis169"
          target="_blank"
          rel="me noreferrer"
        >
          <img className="github__image" src={GithubLogoUser} alt="GithubLogoUser" />
          <p className="github__text">Denis169</p>
        </a>
        <a
          className="github__link"
          href="https://github.com/BromBom"
          target="_blank"
          rel="me noreferrer"
        >
          <img className="github__image" src={GithubLogoUser} alt="GithubLogoUser" />
          <p className="github__text">BromBom</p>
        </a>
      </div>
      <div className="copyright">
        <img className="copyright__image" src={Copyright} alt="Copyright" />
        <p className="copyright__text">2022. React 2022Q3</p>
      </div>
    </footer>
  );
};
