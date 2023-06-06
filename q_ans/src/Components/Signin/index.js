import React, { Component } from "react";
import "./index.css";
// import signup from "./Signup";
import { Link } from "react-router-dom";
import { Base_url } from "../../Config";
import axios from "axios";
let username;
let password;
export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleuserName = (e) => {
    username = e.target.value;
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    password = e.target.value;
    this.setState({ password: e.target.value });
  };
  Signin = (event) => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(`${Base_url}/api/login/`, data)
      .then((res) => {
        alert("Signin Successfull");
        window.location.href = "/All_Questions";
        localStorage.setItem("signin", true);
      })
      .catch((err) => {});

    if (document.myform.user.value == "") {
      alert("enter usernsme");
      document.myform.user.focus();
      return false;
    }
    if (document.myform.pass.value == "") {
      alert("enter password");
      document.myform.pass.focus();
      return false;
    } else {
      // data.forEach((data) => {
      //   if (data.email === UserName && data.password === password) {
      //     count = count + 1;
      //   }
      // });
      // if (count > 0) {
      //   alert("sign up successfull");
      //   count = count - 1;
      //   window.location.reload();
      // } else {
      //   alert("Email address or password not matched");
      // }
    }
  };
  render() {
    return (
      <form name="myform">
        <center>
          
          <div id="box">
          <p id="form">
            <i>Login</i>
          </p>
            <label>User name</label>

            <input
              placeholder="Email..."
              onChange={(e) => {
                this.handleuserName(e);
              }}
              type="text"
              className="form-control"
              name="user"
            />
            <br />
            <label>Password </label>
            <input
              placeholder="Password..."
              onChange={(e) => {
                this.handlePassword(e);
              }}
              type="password"
              className="form-control"
              name="pass"
            />
            <div className="d-flex">
             <input type="checkbox" /><span> Remember me</span><Link to="/Forgot_password" className="ms-3 text-decoration">Forgot password?</Link>
            </div>
            <br />
            <div className="mt-2">
              <button
                onClick={(e) => {
                  this.Signin(e);
                }}
                id="login"
              >
                Login
              </button>
            </div>

            <div className="mt-3">
              <p>
                Not a member?
                <Link to="/Signup" className="text-decoration">Sign up now </Link>
              </p>
            </div>
          </div>
        </center>
      </form>
    );
  }
}