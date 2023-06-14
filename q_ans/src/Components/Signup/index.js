import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Base_url } from "../../Config";
import "./index.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const navigate = useNavigate();
  const handleName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleLastName = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const postdata = {
      username,
      first_name: name,
      last_name: lastName,
      email,
      password,
      password2: confirmPassword,
    };

    if (!username) {
      alert("Please enter a username");
      return;
    }
    if (!name) {
      alert("Please enter a name");
      return;
    }
    if (!lastName) {
      alert("Please enter a last name");
      return;
    }
    if (!email) {
      alert("Please enter an email");
      return;
    }
    if (!password) {
      alert("Please enter a password");
      return;
    }
    if (!confirmPassword) {
      alert("Please enter a confirm password");
      return;
    }
    if (password.length < 6 || password.length > 16) {
      alert("Your password length should be between 6 to 16");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post(`${Base_url}/api/user-registeration/`, postdata)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <label className="mb-1 signuplabel" htmlFor="name">
                    First Name
                  </label>
                  <input
                    maxLength={25}
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={handleName}
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="mb-1 signuplabel" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    maxLength={25}
                    type="text"
                    name="last_name"
                    className="form-control"
                    id="last_name"
                    placeholder="Enter Last Name..."
                    value={lastName}
                    onChange={handleLastName}
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="signuplabel" htmlFor="Username">
                    Username
                  </label>
                  <input
                    maxLength={25}
                    type="text"
                    name="Username"
                    className="form-control"
                    id="Username"
                    placeholder="Enter Username..."
                    value={username}
                    onChange={handleUsername}
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="mb-1 signuplabel" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="Email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="signuplabel mb-1" htmlFor="password">
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
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="signuplabel mb-1" htmlFor="con_password">
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
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                  />
                </div>
                <div className="text-center mt-3 mb-3">
                  <p>
                    <button
                      className="me-2 btnsubmit"
                      style={{}}
                      onClick={submitForm}
                    >
                      Register
                    </button>
                  </p>
                  <p className="mt-2">
                    Already have an account?{" "}
                    <Link to="/Signin">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
