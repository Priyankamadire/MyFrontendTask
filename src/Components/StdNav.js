import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { ClgContext } from '../App';
import './Navbar.css';

const StdNav = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const callHomePage = async () => {
    try {
      const res = await fetch('https://mybackendtask.onrender.com/stddetails', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Sending cookies with the request
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUserName(data.user); // Assuming user name is nested under 'user' object
    } catch (err) {
      console.log(typeof err); // Log the type of error to the console
      console.error(err); // Log the error message to the console
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const { state } = useContext(UserContext);
  const { clgstate } = useContext(ClgContext);
  const RenderMenu = () => {
   
      return (
        <>
          <li className="nav-item me-3">
            <NavLink className="nav-link active bi bi-house-fill text-light" aria-current="page" to="/stdhome" onClick={closeNavbar}>
              Home
            </NavLink>
          </li>
          
          <li className="nav-item me-3">
            <NavLink className="nav-link bi bi-file-earmark-post text-light"   to={`/stdviewassg/${userName.clgname}`} onClick={closeNavbar}>
              View Assg
            </NavLink>
          </li>
        
          <li className="nav-item me-3">
      
            <NavLink className="nav-link bi bi-person-lines-fill  text-light"  to={`/viewmyres/${userName.rlno}`} onClick={closeNavbar}>
              View Results
            </NavLink>
          </li>
          <li className="nav-item me-3"> 
          <NavLink className="nav-link bi bi-bell-fill text-light" to={`/notif/${userName.clgname}`}   onClick={closeNavbar}>
  Notification
</NavLink>

          </li>
          <li className="nav-item me-3">
            <NavLink className="nav-link  bi bi-arrow-left-circle-fill text-light" to="/stdlogout" onClick={closeNavbar}>
              Logout
            </NavLink>
          </li>
        </>
      );
    };
   
  
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${isNavbarOpen ? 'show' : ''}`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/userhome" onClick={closeNavbar}>
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.AUmzQMFBHWms_o8O5cgH0gHaGP&pid=Api&P=0&h=180"
              alt="Logo"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
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
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  ); 
  
  
  
};

export default StdNav;

