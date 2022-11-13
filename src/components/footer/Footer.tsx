import RSSchoolLogo from '../../assets/img/rs_school_js.svg';
import GithubLogoUser from '../../assets/img/github-svgrepo-com.svg';
import Copyright from '../../assets/img/copyright-svgrepo-com.svg';
import './Footer.scss';

export const Footer = () => {
  return (
    <div>
      <a href="https://rs.school/" target="_blank" rel="noreferrer">
        <img src={RSSchoolLogo} alt="RS Logo" />
      </a>
      <div>
        <a href="https://github.com/svr-by" target="_blank" rel="me noreferrer">
          <img src={GithubLogoUser} alt="GithubLogoUser" />
          <p>svr-by</p>
        </a>
        <a href="https://github.com/Denis169" target="_blank" rel="me noreferrer">
          <img src={GithubLogoUser} alt="GithubLogoUser" />
          <p>Denis169</p>
        </a>
        <a href="https://github.com/BromBom" target="_blank" rel="me noreferrer">
          <img src={GithubLogoUser} alt="GithubLogoUser" />
          <p>BromBom</p>
        </a>
      </div>
      <div>
        <img src={Copyright} alt="Copyright" />
        <p>2022. React 2022Q3</p>
      </div>
    </div>
  );
};
