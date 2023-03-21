import React from 'react';
import './Navbar.css';
import { Container } from 'react-bootstrap'
import {
  Link, useNavigate
} from 'react-router-dom';

function navbar() {
  const auth = JSON.parse(localStorage.getItem("student"));
  const authh = JSON.parse(localStorage.getItem("recruiter"));
  const navigate = useNavigate;



  const logout = () => {
    localStorage.clear();
    navigate('/register');
  }

  return (
    <div>
      {
        auth || authh
          ?
          <nav className="navbar">
            <Container>
              <div className="logo">Placement Cell</div>
              <ul className="nav-links">
                <input type="checkbox" id="checkbox_toggle" />
                <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
                <div className="menu">
                  <li><Link to="/">Home</Link></li>
                  {auth ? <li><Link to='/dashboard'><i className="fa-solid fa-user"></i> {auth.firstName}</Link></li> : null}
                  {authh ? (authh.role === "recruiter" ?
                    <li><Link to="/recruiter"><i className="fa-solid fa-user"></i> {authh.username}</Link></li>
                    :
                    <li><Link to="/admin"><i className="fa-solid fa-user"></i> {authh.username}</Link></li>) :
                    null}
                  <li><Link onClick={() => logout()} to="/register">Logout</Link></li>
                </div>
              </ul>
            </Container>
          </nav>
          :
          <nav className="navbar">
            <Container>
              <div className="logo">Placement Cell</div>
              <ul className="nav-links">
                <input type="checkbox" id="checkbox_toggle" />
                <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
                <div className="menu">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </div>
              </ul>
            </Container>
          </nav>
      }
    </div>
  )
}

export default navbar
