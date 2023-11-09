import axiosInstance from './axios';
import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "bootstrap/dist/css/bootstrap.css";



export default function ImageForm({ callback }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    let [image, setImage] = useState();
    const [progress, setProgress] = useState();
    let[btnState, setBtnState] = useState(true);

    // const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }



    const submmitHandler = (e) => {
        console.log(e);
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", selectedFiles[0]);
        console.log("selectedFiles");
        console.log(selectedFiles[0]);
        axiosInstance
            .post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (data) => {
                    let p = Math.round(100 * (data.loaded / data.total));

                    // console.log(e.target);
                    // if (e.target.className === "b") {
                    //     setProgress2(p);
                    // }


                    setProgress(p);

                },



            }).then( async res => {
                console.log("response");
                console.log(Response);
                await callback(res.data.fileName);
            });

    };




    return (
        <>
            <form onSubmit={submmitHandler}>
                <div className='row my-2'>

                    <div className='col col-lg-10 col-md-8 py-3'>
                        <input className='border-secondary form-control my-2' onChange={async e => { console.log(e.target.files); await setSelectedFiles(e.target.files); await onImageChange(e); setBtnState(false); }} type='file' id='file' name='file' ></input>
                        <button disabled={btnState} className='btn btn-dark' type='submit'>Upload</button>
                        {progress && <ProgressBar className='my-2' now={progress} label={`${progress}%`} />}
                    </div>


                    <div className=' col col-lg-2 col-md-4'>
                        {image && <img className='preview' src={image}></img>}
                    </div>




                </div>


            </form>


        </>

    )
}