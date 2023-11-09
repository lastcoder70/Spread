import React from "react";
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "bootstrap/dist/js/bootstrap";
import logo from '../images/logo.png'
import {jwtDecode} from 'jwt-decode'

export default function homepage(){
  async function fetchData() {
    try {
      let response = await fetch("http://localhost:1337/data");
      let maindata = await response.json();
      setData(maindata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
 

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
   
  }, []);


    const navigate= useNavigate();
    function goToLoginPage(e){
        e.preventDefault();
        navigate('/login');
       
    }
    function goToSignUpPage(e){
        e.preventDefault();
        navigate('/register')
        
    }
    
    function checkAndFindToken(e){

    const token=  localStorage.getItem('token')
    if(token){
      const user = jwtDecode(token);
         if(!user){
        localStorage.removeItem('token')
         }
         navigate('/report')

    }
    else{
      navigate('/login')
    }
    
     
  
    }

    async function fetchData() {
      try {
        let response = await fetch("http://localhost:1337/data");
        let maindata = await response.json();
        setData(maindata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    return (
        <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={logo} height="150" width='150'></img></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={goToLoginPage}>signin</button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={goToSignUpPage}>signup</button>
        </li>

        <li className="nav-item">
          <button className="nav-link" onClick={checkAndFindToken}>Report</button>
        </li>
       
      </ul>
    </div>
  </div>
</nav>



<div className="AllCardContainer">
      {data.map((item, index) => (
        <div key={index} className="card mt-4"   style={{ width: "20rem" }}>
          <img className="card-img-top" src={"http://localhost:1337/" + item.image[0]}height='220rem' alt={item.alt} />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">
              <span>{item.ticketNo}</span>
              <br></br>
              {item.description}
            </p>
          </div>

          
          
        </div>
      ))}
    </div>





 
  );









        </>
    )
}