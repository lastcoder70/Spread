import React from "react";
import logo from '../images/logo.png';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#"><img src={logo} height={50}></img></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mt-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link">Login</a>
          </li>
          <li className="nav-item">
            <a href="/register" className="nav-link" >Signup</a>
          </li>
  
          <li className="nav-item">
            <a href="/report" className="nav-link">Report</a>
          </li>
         
        </ul>
      </div>
    </div>
  </nav>
    )
}