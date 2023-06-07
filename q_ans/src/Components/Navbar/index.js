import React from "react";
import { Link } from "react-router-dom";
import Signin from "../Signin/index";
import "./index.css";
const Navbar = () => {
  const HandleSignOut = () => {
    debugger
    localStorage.removeItem("signin");
  };
  const signin = localStorage.getItem("signin");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand ms-5" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            {/*<li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
  </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>*/}
          </ul>
          <form className="d-flex me-5">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          {signin === "true" ? (
            <div className="me-5">
              <button className="btn btn-outline-success signbtn">
                <Link id="signbtn"
                  to="/signin"
                  style={{ textDecoration: "none", color: "#198754"}}
                  onClick={HandleSignOut}
                >
                  Logout
                </Link>
              </button>
            </div>
          ) : (
            <div className="me-5" >
              <button className="btn btn-outline-success">
                <Link id="signbtn"
                  to="/signin"
                  style={{ textDecoration: "none", color: "#198754" }}
                >Signin</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
