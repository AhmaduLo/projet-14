import React from "react";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <header>
      <h1>HRNet</h1>
      <nav>
        <ul>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Accueil</li>
          </NavLink>
          <NavLink
            to="/employeeListe"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>ListeEmploye</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
