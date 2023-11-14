import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import nature from "../images/shine-bike-near-the-trees-1.png";



export default function signIn() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCpassword] = useState();
  const [Name, setName] = useState();
  const [message, setMessage] = useState();
  const [mClass, setMClass] = useState();
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    if (password != cPassword) {
      window.alert("check both password")
      return;
    }
    try {
      const response = await fetch("http://localhost:1337/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name, email, password })
      });

      let responseData = await response.json();

      if (responseData) {
        alert(responseData.message);
        navigate('/login');

      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

  }

  function checkPass(e) {
    console.log(password + " " + cPassword);
    if(password != e.target.value ) {
      setMessage("Password does not match");
      setMClass("text-danger");
    }
   
    else {
      setMessage(null);
      setMClass(null);
      
    }
  }

  return (
    <>
      <div className="row mt-3 overflow-hidde p-3">

        <div className="col-lg-6 oveflow-x-hidden">
        <img src={nature} width="100%" ></img>
        </div>
         


        <div className="col-lg-4 mt-5 shadow">
          <h1 className="text mt-2">Register</h1>

          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              className="form-control rounded-0 border-0 border-success border-3 border-bottom my-3"
              
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control rounded-0 border-0 border-success border-3 border-bottom my-3"
              
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="form-control rounded-0 border-0 border-success border-3 border-bottom my-3"
              
              onChange={(e) => setPassword(e.target.value)}
            />
            {message && <p className={mClass}>{message}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control rounded-0 border-0 border-success border-3 border-bottom my-3"
             
              required
              onInput={(e) => {setCpassword(e.target.value); checkPass(e)}}
              on
            />
            <input type="submit" className="btn btn-success mt-2" value="Register" />
          </form>
        </div>
      </div>

    </>
  )



}