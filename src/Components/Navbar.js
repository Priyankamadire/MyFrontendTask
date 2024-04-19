import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, Outlet } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
 
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);



  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };


  return (
    <>
      <nav className={`navbar navbar-expand-lg ${isNavbarOpen ? 'show' : ''}`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" onClick={closeNavbar}>
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.AUmzQMFBHWms_o8O5cgH0gHaGP&pid=Api&P=0&h=180"
              alt="Logo"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%'
              }}
            />
          </NavLink>
          <button
            className="navbar-toggler btn btn-light"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="menubar">
            <ul className="navbar-nav ms-auto">
           
          <li className="nav-item">
            <NavLink className="nav-link active bi bi-house-fill text-light" aria-current="page" to="/" onClick={closeNavbar}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/about" onClick={closeNavbar}>
              About
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/stdslogin" onClick={closeNavbar}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/teachlogin" onClick={closeNavbar}>
              TEACHER LOGIN
            </NavLink>
          </li>
      
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
