import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Formula Two</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">Drivers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/services">Teams</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Races</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;