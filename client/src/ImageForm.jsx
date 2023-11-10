import axiosInstance from './axios';
import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "bootstrap/dist/css/bootstrap.css";



export default function ImageForm({ callback }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    let [image, setImage] = useState();
    const [progress, setProgress] = useState();
    let [btnState, setBtnState] = useState(true);

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
                    setProgress(p);

                },



            }).then(async res => {
                console.log("response");
                console.log(Response);
                await callback(res.data.fileName);
            });

    };




    return (
        <>
            <form onSubmit={submmitHandler}>
            <div className='row'>
                <div className='col-lg-5'>
                <input className='border-secondary form-control' onChange={async e => { console.log(e.target.files); await setSelectedFiles(e.target.files); await onImageChange(e); setBtnState(false); }} type='file' id='file' name='file' ></input>
                </div>
                <div className='col-lg-2'>
                <button disabled={btnState} className='btn btn btn-success' type='submit'>Upload</button>
                </div>
                {progress && <ProgressBar className='my-2' now={progress} label={`${progress}%`} />}
                <div className='col-lg-5'>
                {image && <img className='preview' width="200" height="200" src={image}></img>}
                </div>
            </div>
                
                
               
               
            </form>
        </>

    )
}