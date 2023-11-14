import { useState } from 'react'
import ImageForm from './ImageForm.jsx';
import "bootstrap/dist/css/bootstrap.css";



export default function Report() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [option, setOption] = useState("");
    let [image1, setImage1] = useState("");
    let [image2, setImage2] = useState("");
    let [btnState, setBtnState] = useState(false);
    let [t, setT] = useState("");


    async function getLocation() {
        if (navigator.geolocation) {
            alert("Fetching location ");
            navigator.geolocation.getCurrentPosition(showPosition);

        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }

    }

    async function showPosition(position) {
        let m = position.coords.latitude +
            ", " + position.coords.longitude;
        console.log(m);
        setT(m);
        setBtnState(true);



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

                alert("Report Send Sucessfully");
                window.location.href = "/";

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
                <div className='row'>
                    <div className='col-lg-2'></div>

                    <div className="col-lg-8 col-sm-12">
                    <h2 className='mt-2'>Post An Issue</h2>
                        <label> Photo</label>
                        <ImageForm callback={setImage1} />
                        <ImageForm callback={setImage2} />
                    </div>
                </div>

                <form onSubmit={handleSubmit} id='fo'>
                    <div className="row my-3 ">
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                    <div className="col-lg- col-sm-12 ">
                            <input  onChange={(e) => setTitle(e.target.value)} className="form-control border-secondary my-1" placeholder="Title" required></input>
                        </div>

                        <div className="col-lg-12 col-sm-12 my-3 ">
                            <select id="options" className="form-control col-lg-4 border-secondary" onChange={(e) => setOption(e.target.value)} required>
                                <option value="">Choose your Problem</option>
                                <option value="street_light">Street Light</option>
                                <option value="road">Road</option>
                                <option value="cleanliness">Cleanliness</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        
                        <div className="col-lg-12 col-sm-12 mt-4">
                            <textarea onChange={(e) => setDescription(e.target.value)} className="border-secondary form-control" required rows={5} placeholder="Describe your problem"></textarea>
                            {!btnState && <p className='text-danger fw-bold mt-2'>Submit Button will appear post sucessfull location fetching</p> } 
                        </div>
                    

                    <div className="row">
                        <div className="col-lg-4 col-sm-12 mt-4">
                        
                            <input className="btn btn-primary mx-4" onClick={async () => { await getLocation();  }} type="button" name='cordinates' value="Location"></input>
                         
                           {btnState && <button  className="btn btn btn-success" type="submit">Post</button>}

                        </div>
                    </div>

                    </div>
                        
                        








                    </div>

                </form>




            </div>
        </>
    )
}