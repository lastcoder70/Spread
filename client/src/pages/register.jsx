import React, { useState } from "react";
import{useNavigate} from 'react-router-dom'


export default function  signIn(){

  const [email ,setEmail]=useState();
  const [password ,setPassword]=useState();
  const [cPassword ,setCpassword]=useState();
  const [Name,setName]=useState();
   const navigate= useNavigate();

   async function registerUser(e){
    e.preventDefault();
    if(password!=cPassword){
      window.alert("check both password")
      return ;
    }
    try {
      const response = await fetch("http://localhost:1337/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name, email, password })
      });
      
      let responseData= await response.json();
      console.log(responseData);
    
      
      // if (response.ok) {
      //   window.alert(data.message);
      //   navigate('/login')
        
      // } else {
      
      //   alert("Request failed with status: " + response.status);
      // }
      if(responseData){
        alert(responseData.message);
        navigate('/login');

      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  
  }

return (
  <>
   <h1>Register</h1>  
 
      <form onSubmit={registerUser}>
      <input
          type="text"
          placeholder="Name"
          value={Name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={cPassword}
          required
          onChange={(e) => setCpassword(e.target.value)}
        />
        <input type="submit" value="register" />
      </form>

  </>
)



}