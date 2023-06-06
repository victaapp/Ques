import React, { Component } from "react";
import { Link, json } from "react-router-dom";
import { Base_url } from "../../Config";
// import Signin from "./Signin";
import "./index.css";
import axios from "axios";
let email;
let arr = [];
export default class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      last_name: "",
      email: "",
      number: "",
      password: "",
      confirm_password: "",
    };
  }

  handleUsername = (e) => {
    let Username = e.target.value;
    // let UsernameVal = /^[A-Za-z]+$/;
    // if (Username == "" || UsernameVal.test(Username))
    this.setState({ Username: Username });
  };

  handleName = (e) => {
    let name = e.target.value;
    let nameVal = /^[A-Za-z]+$/;
    if (name == "" || nameVal.test(name)) this.setState({ name: name });
  };

  handleLastName = (e) => {
    let last_name = e.target.value;
    let last_nameVal = /^[A-Za-z]+$/;
    if (last_name == "" || last_nameVal.test(last_name))
      this.setState({ last_name: last_name });
  };
  handleEmail = (e) => {
    email = e.target.value;
    this.setState({ email: email });
  };

  handleNumber = (e) => {
    // this.setState({ number: e.target.value });
    // if (isNaN(e.target.value)) {
    //   alert("Please input Number Value");
    //   e.target.value = "";
    //   document.myform1.number.focus();
    // }
    // if (
    //   e.target.value.charAt(0) != 9 &&
    //   e.target.value.charAt(0) != 8 &&
    //   e.target.value.charAt(0) != 7
    // ) {
    //   alert("Please Start Your Number with 9, 8, 7");
    //   e.target.value = "";
    //   document.myform1.number.focus();
    // }
    // this.setState({ number: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
    // debugger
    if (email == undefined) {
      alert("Please input email address");
      document.myform1.email.focus();
      this.setState({ password: "" });
    } else if (email.indexOf("@") <= 0) {
      alert("Please enter @ in email field");
      document.myform1.email.focus();
    } else if (email.includes("gmail") !== true) {
      alert("Please enter a valid email address");
      document.myform1.email.focus();
    } else if (
      email.charAt(email.length - 4) !== "." &&
      email.charAt(email.length - 3) !== "."
    ) {
      alert("Please enter . ");
      document.myform1.email.focus();
    }
    // if (this.state.number.length < 10) {
    //   alert("Please complete your mobile number");
    //   document.myform1.number.focus();
    // }
  };
  handleConfirm_password = (e) => {
    if (this.state.password.length < 6 || this.state.password.length > 16) {
      alert("Your password length between 6 to 16");
    }
    this.setState({ confirm_password: e.target.value });
  };
  submitForm = (e) => {
    e.preventDefault();

    let username = this.state.Username;
    let first_name = this.state.name;
    let last_name = this.state.last_name;
    let email = this.state.email;
    // let number = this.state.number;
    let password = this.state.password;
    let password2 = this.state.confirm_password;
    let postdata = {
      username,
      first_name,
      last_name,
      email,

      // number,
      password,
      password2,
    };
    console.log("postdata" + postdata);
    let data = JSON.stringify(postdata);
    console.log("json data" + data);

    if (document.myform1.Username.value == "") {
      alert("enter Username");
      document.myform1.Username.focus();
      return false;
    }
    if (document.myform1.name.value == "") {
      alert("enter name");
      document.myform1.name.focus();
      return false;
    }

    if (document.myform1.last_name.value == "") {
      alert("enter last name");
      document.myform1.last_name.focus();
      return false;
    }

    if (document.myform1.email.value == "") {
      alert("enter email");
      document.myform1.email.focus();
      return false;
    }

    // if (document.myform1.number.value == "") {
    //   alert("enter number");
    //   document.myform1.number.focus();
    //   return false;
    // }
    if (document.myform1.password.value == "") {
      alert("enter password");
      document.myform1.password.focus();
      return false;
    }
    if (document.myform1.confirm_password.value == "") {
      alert("enter confirm password");
      document.myform1.confirm_password.focus();
      return false;
    } else if (
      this.state.password.includes(this.state.confirm_password) !== true
    ) {
      alert("Please enter the same password");
    } else {
      axios
        .post(`${Base_url}/api/user-registeration/`, postdata)
        .then((res) => {
          console.log(res);
          alert("Yeah! Signed Up Successfully");
          window.location.href = "/signin";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12"></div>
            <div className="col-12">
              <div id="box1" className="col-4 mx-auto  bg-light">
                <p id="form1" className="mx-auto text-center">
                  Sign Up
                </p>
                <form name="myform1" id="signupform">
                  <div className="form-group mt-2">
                    <label className="mb-1 label" htmlFor="name">
                      First Name
                    </label>
                    <input
                      maxLength={25}
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name..."
                      value={this.state.name}
                      onChange={(e) => {
                        this.handleName(e);
                      }}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="mb-1 label" htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      maxLength={25}
                      type="text"
                      name="last_name"
                      className="form-control"
                      id="last_name"
                      placeholder="Enter Last Name..."
                      value={this.state.last_name}
                      onChange={(e) => {
                        this.handleLastName(e);
                      }}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="label" htmlFor="Username">
                      Username
                    </label>
                    <input
                      maxLength={25}
                      type="text"
                      name="Username"
                      className="form-control"
                      id="Username"
                      placeholder="Enter Username..."
                      value={this.state.Username}
                      onChange={(e) => {
                        this.handleUsername(e);
                      }}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="mb-1 label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="Email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={(e) => {
                        this.handleEmail(e);
                      }}
                    />
                  </div>

                  {/*<div className="form-group mt-2">
                <label className="label mb-4" htmlFor="number">
                  Mobile Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  name="number"
                  className="form-control"
                  id="number"
                  placeholder="Enter Number..."
                  value={this.state.number}
                  onChange={(e) => {
                    this.handleNumber(e);
                  }}
                />
                </div>*/}

                  <div className="form-group mt-2">
                    <label className="label mb-1" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="Password"
                      name="password"
                      minLength={6}
                      maxLength="16"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={(e) => {
                        this.handlePassword(e);
                      }}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="label mb-1" htmlFor="con_password">
                      Confirm Password
                    </label>
                    <input
                      type="Password"
                      name="confirm_password"
                      minLength="6"
                      maxLength="16"
                      className="form-control"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={this.state.confirm_password}
                      onChange={(e) => {
                        this.handleConfirm_password(e);
                      }}
                    />
                  </div>

                  <div className="text-center mt-3 mb-3">
                    <p>
                      <button
                        className="me-2 btnsubmit"
                        style={{}}
                        onClick={(e) => this.submitForm(e)}
                      >
                        Resister
                      </button>
                    </p>
                    <p className="mt-2">
                      Already have an account?
                      <a className="ms-2">
                        <Link to="/Signin">Login here</Link>
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
