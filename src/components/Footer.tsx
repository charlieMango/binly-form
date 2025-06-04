import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Индивидуальный предприниматель: Андреев Михаил Евгеньевич</p>
        <p>ИНН: 165921377917</p>
        <p>ОГРНИП: 324169000148978</p>
        <p>Адрес: г. Казань, пер. Липовый, д. 4</p>
      </div>
      <div className="footer-links">
        <Link to="/legal">Пользовательское соглашение</Link>
        <Link to="/privacy">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
};

export default Footer; 