import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>ИП Андреев Михаил Евгеньевич</p>
        <p>ИНН 165921377917</p>
      </div>
      <div className="footer-links">
        <Link to="/legal">Пользовательское соглашение</Link>
        <Link to="/privacy">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
};

export default Footer;
