import React from "react";
import { Link } from "react-router-dom";
import Signin from "../Signin/index";
import "./index.css";
import logo from "../images/logo.png";
const Navbar = () => {
  const HandleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
    // localStorage.removeItem("ThroughPost");
    // localStorage.removeItem("volunteer");
    // localStorage.removeItem("false");
    // localStorage.removeItem("user");
    // localStorage.removeItem("false");
    // localStorage.removeItem("false");
  };
  const signin = localStorage.getItem("Login_token");
  const HandleSignIn = () => {
    const QID = localStorage.getItem("QID");
    localStorage.setItem("signin", true);
    // if(QID !==null){
    //   window.location.href = "/Signin";
    //   localStorage.removeItem("ThroughPost");
    // }else{
    //       window.location.href = "/Signin";

    // }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/">
          <img src={logo} alt="logo" />
        </Link>
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
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
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
              <button
                className="btn btn-outline-success signbtn"
                onClick={HandleSignOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="me-5">
              <button className="btn btn-outline-success">
                <Link
                  id="signbtn"
                  to="/signin"
                  style={{ textDecoration: "none", color: "#198754" }}
                  onClick={HandleSignIn}
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
