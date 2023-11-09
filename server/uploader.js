const express = require("express");
const cors = require("cors");
const multer = require("multer");
const report= require('./models/reports')
const mongoose = require('mongoose')


const upload = require("./upload");

const app = express();
app.use(express.json());

//Add the client URL to the CORS policy
const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.post("/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    throw Error("FILE_MISSING");
  } else {
    console.log(req.file);
    res.send({ status: "success", fileName : req.file.filename});
  }
});

app.post("/report", (req, res) => {
  console.log(req.body);
  report.create()
     
  res.status(200).json({ message: 'Data received successfully' });

  // You can now use the data as needed
 

})

//Error handling
app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.statusCode = 400;
    res.send({ code: err.code });
  } else if (err) {
    if (err.message === "FILE_MISSING" || err.message === "INVALID_TYPE") {
      res.statusCode = 400;
      res.send({ code: err.message });
    } else {
        console.log(err);
      res.statusCode = 500;
      res.send({ code: "GENERIC_ERROR" });
    }
  }
});

const server = app.listen(8081, function () {
  console.log("Server started at 8081");
});