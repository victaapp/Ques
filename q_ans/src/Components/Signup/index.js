import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Signin from "./Signin";
import './index.css'
let email;
let arr = [];
export default class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      number: "",
      password: "",
      confirm_password: "",
    };
  }
  handleName = (e) => {
    let name = e.target.value;
    let nameVal = /^[A-Za-z]+$/;
    if (name == "" || nameVal.test(name)) this.setState({ name: name });
  };

  handleEmail = (e) => {
    email = e.target.value;
    this.setState({ email: email });
  };

  handleNumber = (e) => {
    this.setState({ number: e.target.value });

    if (email == "") {
      alert("Please input email address");
      document.myform1.email.focus();
    }
    if (email.indexOf("@") <= 0) {
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

    if (isNaN(e.target.value)) {
      alert("Please input Number Value");
      e.target.value = "";
      document.myform1.number.focus();
    }

    if (
      e.target.value.charAt(0) != 9 &&
      e.target.value.charAt(0) != 8 &&
      e.target.value.charAt(0) != 7
    ) {
      alert("Please Start Your Number with 9, 8, 7");
      e.target.value = "";
      document.myform1.number.focus();
    }
    this.setState({ number: e.target.value });
  };

  handlePassword = (e) => {
    if (this.state.number.length < 10) {
      alert("Please complete your mobile number");
      document.myform1.number.focus();
    }
    this.setState({ password: e.target.value });
  };
  handleConfirm_password = (e) => {
    if (this.state.password.length < 6 || this.state.password.length > 16) {
      alert("Your password length between 6 to 16");
    }
    this.setState({ confirm_password: e.target.value });
  };
  submitForm = async (e) => {
    e.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let number = this.state.number;
    let password = this.state.password;
    let confirm_password = this.state.confirm_password;
    let postdata = {
      name,
      email,
      number,
      password,
      confirm_password,
    };
    let res = await fetch(`http://localhost:3000/posts`, {
      method: "POST",
      body: JSON.stringify(postdata),
      headers: { "content-Type": "application/json" },
    });
    // debugger
    let data = await res.text();

    if (document.myform1.name.value == "") {
      alert("enter name");
      document.myform1.name.focus();
      return false;
    }

    if (document.myform1.email.value == "") {
      alert("enter email");
      document.myform1.email.focus();
      return false;
    }

    if (document.myform1.number.value == "") {
      alert("enter number");
      document.myform1.number.focus();
      return false;
    }
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
      alert("Yeah! Signed Up Successfully");
      window.location.reload();
    }
    let obj = {};
    obj.name = this.state.name;
    obj.email = this.state.email;
    arr.push(obj);
    localStorage.setItem("formData", JSON.stringify(arr));
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <p id="form1" className="mx-auto text-center">
            <i className="text-center">Sign Up To Post your questions</i>
          </p>
          <div id="box1" className="col-4 mx-auto  bg-light">
            <form name="myform1">
              <div class="form-group mt-2">
                <label className="mb-4 label" htmlFor="name">
                  Name
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
              <div class="form-group mt-2">
                <label className="mb-4 label" htmlFor="email">
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

              <div class="form-group mt-2">
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
              </div>

              <div class="form-group mt-2">
                <label className="label mb-4" htmlFor="password">
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

              <div class="form-group mt-2">
                <label className="label mb-4" htmlFor="con_password">
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
                <a
                  href="#"
                  onClick={(e) => this.submitForm(e)}
                  className="me-2"
                >
                  Submit
                </a>
                or
                <a style={{ display: "inline-block" }} className="ms-2">
                  <Link to="/Signin">Sign in</Link>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
