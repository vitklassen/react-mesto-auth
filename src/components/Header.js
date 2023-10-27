import logoPath from "../image/logo/header-logo.svg";
import { Link } from "react-router-dom";
function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logoPath} alt="Логотип" />
      <div className="header__info">
        <p className="header__userEmail">{props.email}</p>
        <Link className="header__link" to={`/${props.path}`}>
          {props.text}
        </Link>
      </div>
    </header>
  );
}
export default Header;
