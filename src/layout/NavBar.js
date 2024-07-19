import React from "react";
import { Link, NavLink } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  bg-primary" >
        <div className="container-fluid">
          <a className="navbar-brand center-text" href="#">
            Manager Calendar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
       
              <button className="btn btn-primary">
                <NavLink
                  className="nav-link text-white"
                  exact
                  to="/AttendenceCalendar"
                >
                  AttendenceCalendar
                </NavLink>
              </button>
            
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
