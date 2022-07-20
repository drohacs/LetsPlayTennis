import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas-code"> </i> Lets Play Tennis
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profiles"></Link>Players
        </li>
        <li>
          <Link to="/register"></Link>Register
        </li>
        <li>
          <Link to="/login"></Link>Login
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
