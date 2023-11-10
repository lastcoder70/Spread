import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";


export default function loginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function loginUser(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();
      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("welcome");
        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <>
    
  
      <div className="row pt-2">
        <div className="col-lg-3"></div>
        <div className="col col-lg-6 h px-3 pb-2 border-bottom ">
          <h2 className="text-dark">LogIn</h2>
          <form onSubmit={loginUser}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control rounded-pill"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control rounded-pill"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="btn btn-success mt-2">
              LogIn
            </button>
          </form>
        </div>
        <div className="col col-lg-2 h" v></div>
      </div>
    </>
  );
}
