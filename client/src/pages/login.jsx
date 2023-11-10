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


      <div className="row pt-2 mt-5 mx-2">
        {/* <div className="col-lg-3"></div> */}
        <div className="col-lg-4 col-sm-6 px-3 m-auto pb-2 shadow  ">
          <h2 className="text-dark">LogIn</h2>
          <form onSubmit={loginUser}>
            <div className="form-group">
              {/* <label for="exampleInputEmail1">Email address</label> */}
              <input
                type="email"
                className="form-control mt-3 rounded-0 border-0 border-success border-3 border-bottom"
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
            <div className="form-group mt-2">
              {/* <label for="exampleInputPassword1">Password</label> */}
              <input
                type="password"
                className="form-control rounded-0 border-0 border-success border-3 border-bottom my-3"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="row my-4">
            <div className="col-lg-6 col-sm-6">
              <a href="/register" className="link d-block text-success">Create an Account</a>
            </div>
              <div className="col-lg-6  col-sm-6 ml-auto text-end">
                <button type="submit" className="btn btn-success"> LogIn </button>
              </div>
            </div>



          </form>
        </div>
      </div>
    </>
  );
}
