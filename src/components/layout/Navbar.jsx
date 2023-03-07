import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="nav nav--main">
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? "nav__item nav__item--active" : 'nav__item')}
      >
        All
      </NavLink>
      <NavLink className={(navData) => (navData.isActive ? "nav__item nav__item--active" : 'nav__item')} to="/myFaves">
        My faves
      </NavLink>
    </nav>
  );
};
