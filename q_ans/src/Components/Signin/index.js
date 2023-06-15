import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Base_url } from "../../Config";
import axios from "axios";
import "./index.css";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const QID = localStorage.getItem("QID");
  const volunteer = localStorage.getItem("volunteer");
  const isPost = localStorage.getItem("ThroughPost");
  const OnlyUser = localStorage.getItem("OnlyUser");
  const signin = localStorage.getItem("signin");
  const Login_token = localStorage.getItem("Login_token");
  const scrollToEditor = localStorage.getItem("scrollToEditor");
  const Edit = localStorage.getItem("Edit");
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    axios
      .post(`${Base_url}/api/login/`, data)
      .then((res) => {
        localStorage.setItem("user", username);
        if (volunteer === "false" && QID !== null) {
          localStorage.setItem("volunteer", true);
          window.localStorage.setItem("Login_token", res.data.access);
          navigate("/All_Questions");
        } else if (volunteer === "true" && isPost === "true" && Edit === null) {
          window.localStorage.setItem("Login_token", res.data.access);
          navigate("/Post_Question");
        } else if (volunteer === "true" && signin === "true" && Edit === null) {
          window.localStorage.setItem("Login_token", res.data.access);
          navigate("/All_Questions");
        } else if (QID !== null && volunteer === "true" && Edit === "false") {
          window.localStorage.setItem("Login_token", res.data.access);
          navigate("/Ques_Answer");
        } else if (
          QID !== null &&
          volunteer === "true" &&
          Edit === "false" &&
          isPost === "true"
        ) {
          window.localStorage.setItem("Login_token", res.data.access);
          navigate("/Ques_Answer");
        } else {
          window.localStorage.setItem("Login_token", res.data.access);
          navigate("/All_Questions");
        }
        // scrollToEditor!==undefined
        // else if (
        //   isPost === "true" ||
        //   (volunteer === "false" && OnlyUser === "false")
        // ) {
        //   window.localStorage.setItem("Login_token", res.data.access);
        //   navigate("/Post_Question");
        // }
        // else if(scrollToEditor!==undefined){
        //   // localStorage.removeItem("Give_Ans");
        //   window.localStorage.setItem("Login_token", res.data.access);
        //   navigate("/Ques_Answer");
        //   scrollToEditor.scrollIntoView({ behavior: "smooth" });
        // }
      })
      .catch((err) => {});

    if (username === "") {
      alert("Enter username");
      return;
    }

    if (password === "") {
      alert("Enter password");
      return;
    }
  };

  return (
    <form>
      <center>
        <div id="box">
          <p id="form">Login</p>
          <label className="signinlabel">User name</label>
          <input
            placeholder="Email..."
            onChange={handleUsername}
            type="text"
            className="form-control signin-form-control"
            name="user"
          />
          <br />
          <label className="signinlabel">Password</label>
          <input
            placeholder="Password..."
            onChange={handlePassword}
            type="password"
            className="form-control signin-form-control"
            name="pass"
          />
          <div className="d-flex justify-content-between">
            <span>
              <input type="checkbox" />
              <span> Remember me</span>
            </span>
            <Link to="/Forgot_password" className="ms-3 text-decoration">
              Forgot password?
            </Link>
          </div>
          <br />
          <div className="mt-2">
            <button onClick={handleSignIn} id="login">
              Login
            </button>
          </div>
          <div className="mt-3">
            <p>
              Not a member?
              <Link to="/Signup" className="text-decoration">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </center>
    </form>
  );
};

export default Signin;
