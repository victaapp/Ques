import React from "react";
import { Link } from "react-router-dom";
import Signin from "../Signin/index";
import "./index.css";
const Navbar = () => {
  const HandleSignOut = () => {
    localStorage.removeItem("Login_token");
  };
  const signin = localStorage.getItem("Login_token");

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
          {signin !== null ? (
            <div className="me-5">
              <button className="btn btn-outline-success signbtn">
                <Link
                  id="signbtn"
                  to="/"
                  style={{ textDecoration: "none", color: "#198754" }}
                  onClick={HandleSignOut}
                >
                  Logout
                </Link>
              </button>
            </div>
          ) : (
            <div className="me-5">
              <button className="btn btn-outline-success">
                <Link
                  id="signbtn"
                  to="/signin"
                  style={{ textDecoration: "none", color: "#198754" }}
                >
                  Signin
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
