import logoPath from '../image/logo/header-logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logoPath} alt="Логотип"/>
        </header>
    );
}
export default Header;