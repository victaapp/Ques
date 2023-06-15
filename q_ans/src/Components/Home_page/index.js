import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AllQuestions from "../All_Questions";
// import 'react-paginate/dist/react-paginate.css';
const Home_page = () => {
  // const [volunteer, setVolunteer] = useState(false);
  // const [currentPage, setCurrentPage] = useState(0);
  // localStorage.setItem("Login_token", "false");
  // localStorage.setItem("OnlyUser", false);
  // localStorage.setItem("volunteer", volunteer);
  // localStorage.removeItem("QID");
  // localStorage.removeItem("user");

  const getQuestions = () => {
    // window.location.href = "/All_Questions";
    // setVolunteer(true);
    localStorage.setItem("volunteer", true);
  };
  const OnlyUser = () => {
    // window.location.href = "/All_Questions";
    localStorage.setItem("OnlyUser", true);
  };
  return (
    <div className="">
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 text-start mb-5">
            <Link to="/signin" style={{ color: "black" }}>
              Signin
            </Link>
          </div>
          <div className="col-6 text-start">
            <Link to='/All_Questions'>
              <button className="btn btn-dark" onClick={OnlyUser}>
                User
              </button>
            </Link>

            <Link to="/All_Questions">
              <button className="btn btn-dark ms-4" onClick={getQuestions}>
                Volunteer
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-5"></div>
      </div>
    </div>
  );
};

export default Home_page;
