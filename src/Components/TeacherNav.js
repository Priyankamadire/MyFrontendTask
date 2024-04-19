import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Navbar.css';

const TeacherNav = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const callHomePage = async () => {
    try {
      const res = await fetch('https://mybackendtask.onrender.com/mydetails', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUserName(data.user);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    callHomePage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const RenderMenu = () => {
    return (
      <>
        <li className="nav-item me-3">
          <NavLink className="nav-link active bi bi-house-fill text-light" aria-current="page" to="/clghome" onClick={closeNavbar}>
            Home
          </NavLink>
        </li>
        <li className="nav-item me-3">
          <NavLink className="nav-link bi bi-person-circle text-light" to={`/viewsubstd/${userName.name}`} onClick={closeNavbar}>
            View Student Data
          </NavLink>
        </li>
        <li className="nav-item me-3">
          <NavLink className="nav-link bi bi-file-earmark-post text-light" to="/postassg" onClick={closeNavbar}>
            Post Assignment
          </NavLink>
        </li>
        <li className="nav-item me-3">
          <NavLink className="nav-link bi bi-person-lines-fill text-light" to={`/clgviewassg/${userName.name}`}  onClick={closeNavbar}>
            View My Posts
          </NavLink>
        </li>
        
        <li className="nav-item me-3">
          <NavLink className="nav-link bi bi-arrow-left-circle-fill text-light" to="/teachlogout" onClick={closeNavbar}>
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

export default TeacherNav;
