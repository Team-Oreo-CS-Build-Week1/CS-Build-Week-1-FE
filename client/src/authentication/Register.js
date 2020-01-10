import React, { useState } from "react";
import axios from "axios";

export default function Register(props) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password1: "",
    password2: ""
  });

  const handleChange = event => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event, userInfo) => {
    event.preventDefault();
    console.log(userInfo);
    axios
      .post("http://localhost:8000/api/registration/", userInfo)
      .then(response => {
        console.log(response.data);
        props.history.push("/login");
      })
      .catch(error => {
        console.error(error);
      });
    // setUserInfo({
    //   username: "",
    //   password1: "",
    //   password2: ""
    // });
  };

  return (
    <div className="form" style={{ textAlign: "center" }}>
      <div className="register-text">
        <h1>Register</h1>
      </div>
      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={event => handleSubmit(event, userInfo)}>
        <label style={{ textAlign: "center", margin: "8px" }}>Username</label>
        <input
          style={{ marginTop: "20px" }}
          className="regInput"
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={event => handleChange(event)}
        />
        <br />
        <label style={{ textAlign: "center", margin: "8px" }}>Password</label>
        <input
          style={{ marginTop: "20px" }}
          className="regInput"
          type="password"
          name="password1"
          placeholder="Enter Password"
          onChange={event => handleChange(event)}
        />
        <br />
        <label style={{ textAlign: "center", margin: "8px" }}>
          Confirm Password
        </label>
        <input
          style={{ marginTop: "20px" }}
          className="regInput"
          type="password"
          name="password2"
          placeholder="Retype Password"
          onChange={event => handleChange(event)}
        />
        <br />
        <div className="regButton" style={{ marginTop: "10px" }}>
          <button>Create Account</button>
        </div>
      </form>
    </div>
  );
}
