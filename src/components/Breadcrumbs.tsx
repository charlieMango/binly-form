import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  currentPage: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage }) => {
  return (
    <nav className="breadcrumbs">
      <Link to="/">Главная</Link> / <span>{currentPage}</span>
    </nav>
  );
};

export default Breadcrumbs; 