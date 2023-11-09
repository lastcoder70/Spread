import { useState } from 'react'
import ImageForm from './ImageForm.jsx';
import "bootstrap/dist/css/bootstrap.css";



export default function Report() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [option, setOption] = useState("");
    const [message, setMessage] = useState("");
    let [cordinates, setCordinates] = useState("");
    let [image1, setImage1] = useState("");
    let [image2, setImage2] = useState("");
    let [btnState, setBtnState] = useState(true);
    let [t, setT] = useState("");


  async function getLocation() {
        if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
       
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
        
    }

      async function showPosition(position) {
        let m = position.coords.latitude +
            ", " + position.coords.longitude;
            console.log( m);

      

        setT(m);
        setBtnState(false);
      
        

    }




    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:1337/report", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    option: option,
                    cordinates: await t,
                    image1: image1,
                    image2: image2
                }),
            });
            console.log(image1);
            let resJson = await res.json();
            console.log(resJson);
            if (res.status === 200) {
                setTitle("");
                setDescription("");
                setOption("");

                setMessage("Report Send Sucessfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="container border">

                <div className="col-lg-8 col-sm-12">
                    <label> Photo</label>
                    <ImageForm callback={setImage1} />
                    <ImageForm callback={setImage2} />
                </div>

                <form onSubmit={handleSubmit} id='fo'>
                    <div className="row my-3 ">

                        <div className="col-lg-8 col-sm-12 ">
                            <input  onChange={(e) => setTitle(e.target.value)} className="form-control border-secondary my-1" placeholder="Title" required></input>
                        </div>
                        
                        


                        <div className="col-lg-4 col-sm-12 my-1 ">
                            <select id="options" className="form-control col-lg-4 border-secondary" onChange={(e) => setOption(e.target.value)} required>
                                <option value="">Choose your Problem</option>
                                <option value="street_light">Street Light</option>
                                <option value="road">Road</option>
                                <option value="cleanliness">Cleanliness</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-lg-8 col-sm-12">
                            <textarea onChange={(e) => setDescription(e.target.value)} className="border-secondary form-control" required rows={5} placeholder="Describe your problem"></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-sm-12">
                            <input className="btn btn-info mx-4" onClick={async () => { await getLocation();  }} type="button" name='cordinates' value="Location"></input>
                            <button disabled={btnState} className="btn btn-dark" type="submit">Submit</button>

                        </div>
                    </div>

                </form>
                {message && <h1>{message}</h1>}



            </div>
        </>
    )
}