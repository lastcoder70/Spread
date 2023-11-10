import React from "react";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/js/bootstrap";
import { jwtDecode } from 'jwt-decode'

export default function homepage() {
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


  const navigate = useNavigate();
 



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
      <div className="AllCardContainer">
        {data.map((item, index) => (
          <div key={index} className="card mt-4" style={{ width: "20rem" }}>
            <img className="card-img-top" src={"http://localhost:1337/" + item.image[0]} height='220rem' alt={item.alt} />
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