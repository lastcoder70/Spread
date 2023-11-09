import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from 'react-router-dom'


export default function dashboard(){


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
    const navigate =useNavigate();  
    const [user,setuser]= useState();


    useEffect(()=>{
        const token= localStorage.getItem('token');
        if (token){
            const user = jwtDecode(token);
             setuser(user.name);
             if(!user){
                localStorage.removeItem('token');
                navigate('/login');
             }
          
        }
       
         
         else{
            console.log("no please login");
           navigate('/login')
         }
       

    },[])
    



 
    return (
        <>
            <h1>hii {user}</h1>



            <div className="AllCardContainer">
      {data.map((item, index) => (
        <div key={index} className="card mt-4"   style={{ width: "20rem" }}>
          <img className="card-img-top" src={"http://localhost:1337/" + item.image[0]} alt={item.alt} />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">
              <span>{item.ticketNo}</span>
              <br></br>
              {item.description}
            </p>
          </div>

          {/* <div className="dropdown">
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
          </div> */}
        </div>
      ))}
    </div>


        </>
    )
}