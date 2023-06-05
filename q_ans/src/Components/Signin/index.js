import React, { Component } from "react";
import "./index.css";
// import signup from "./Signup";
import { Link } from "react-router-dom";
let UserName;
let count = 0;
let password;
export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      password: "",
    };
  }

  handleuserName = (e) => {
    UserName = e.target.value;
    this.setState({ UserName: e.target.value });
  };

  handlePassword = (e) => {
    password = e.target.value;
    this.setState({ password: e.target.value });
  };
  Myfunction = async (event) => {
    event.preventDefault();
    const res = await fetch(`http://localhost:3000/posts`);
    const data = await res.json();
    console.log(data);

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
      data.forEach((data) => {
        if (data.email === UserName && data.password === password) {
          count = count + 1;
        }
      });

      if (count > 0) {
        alert("sign up successfull");
        count = count - 1;
        window.location.reload();
      } else {
        alert("Email address or password not matched");
      }
    }
  };
  render() {
    return (
      <form name="myform">
        <center>
          <p id="form">
            <i>Login To Post Your Questions</i>
          </p>
          <div id="box">
            <label>User name</label>
            <br />
            <br />
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
            <br />
            <br />
            <input
              placeholder="Password..."
              onChange={(e) => {
                this.handlePassword(e);
              }}
              type="password"
              className="form-control"
              name="pass"
            />
            <br />
            <a
              href="#"
              id="login"
              onClick={(e) => {
                this.Myfunction(e);
              }}
            >
              Login
            </a>
            <div className="mt-2 mb-2">or</div>
            <div>
              <a href="#" id="login" className="remove_U_L">
                <Link to="/Signup">Sign up</Link>
              </a>
            </div>
          </div>
        </center>
      </form>
    );
  }
}
