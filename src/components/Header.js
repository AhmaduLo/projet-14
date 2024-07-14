import React from "react";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <header>
      <h1>HRNet</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/employeeListe" className={(nav) => (nav.isActive ? "nav-active" : "")}>
              ListeEmploye
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
