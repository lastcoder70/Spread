import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/src/dropdown";
import './style.css'


export default function YourComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  async function updateStatus(e) {
    let index = e.target.getAttribute("index");
    console.log(data[index]);
    let dataIndex = e.target.getAttribute("index");
    let ticketNo = data[dataIndex].ticketNo;
    let currentStatus = e.target.textContent;

    let response = await fetch("http://localhost:1337/updateStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketNo, currentStatus }),
    });
    let ticketData = await response.json();
    console.log(ticketData);
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
    
    <div className="AllCardContainer">
      {data.map((item, index) => (
        <div key={index} className="card mt-4"   style={{ width: "20rem" }}>
          <img className="card-img-top" src={item.image[0]} alt={item.alt} />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">
              <span>{item.ticketNo}</span>
              <br></br>
              {item.description}
            </p>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              widht="2"
            >
              {item.status}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li
                className="dropdown-item"
                href="#"
                index={index}
                onClick={updateStatus}
              >
                Accept
              </li>

              <li
                className="dropdown-item"
                href="#"
                index={index}
                onClick={updateStatus}
              >
                Reject
              </li>
              <li
                className="dropdown-item"
                href="#"
                index={index}
                onClick={updateStatus}
              >
                Done
              </li>
              <li
                className="dropdown-item"
                href="#"
                index={index}
                onClick={updateStatus}
              >
                In Progress
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
 
  );
}
