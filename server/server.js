const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const app = express();
const jwt = require("jsonwebtoken");
const report = require("./models/reports");
const upload = require("./upload");


const user = require("./models/user");

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"));


mongoose.connect("mongodb://127.0.0.1:27017/civilians").then(() => {
  console.log("connection succeded");

  app.post("/register", async (req, res) => {
    let name = req.body.Name;
    let email = req.body.email;
    let password = req.body.password;

    try {
      if ((await user.findOne({ email: email })) != null) {
        return res.status(409).json({ message: "email already present" });
      } else {
        bcrypt.genSalt(9, (err, salt) => {
          bcrypt.hash(password, salt, async function (err, hash) {
            await user.create({ Name: name, email: email, password: hash });
            return res.status(200).json({ message: "Registration successful" });
          });
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);

      return res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/login", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const userRecord = await user.findOne({ email: email });
    console.log(userRecord);

    if (userRecord) {
      const passwordMatch = await bcrypt.compare(password, userRecord.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { name: userRecord.Name, email: userRecord.email },
          "secret123"
        );
        console.log(jwt.decode(token));

        console.log("user found");

        return res.json({ status: "ok", message: "Loggned", user: token });
      } else {
        return res.json({ status: "200", message: "password is worng" });
      }
    } else {
      return res.json({ status: "200", message: "please register" });
    }
  });

  app.get("/reports", async (req, res) => {
    let data = await report.find();
    console.log(data);
  });

  app.get("/data", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let data = await report.find();
    res.json(data);
  });
  app.post("/updateStatus", async (req, res) => {
    let response = req.body;

    await report.updateOne(
      { ticketNo: response.ticketNo },
      { $set: { status: response.currentStatus } }
    );
    let data = await report.findOne({ pincode: 12345 });
    console.log(data);
  });

  app.post("/upload", upload.single("file"), function (req, res) {
    console.log(req);
    if (!req.file) {
      throw Error("FILE_MISSING");
    } else {
      console.log(req.file);
      res.send({ status: "success", fileName: req.file.filename });
    }
  });

  app.post("/report", async (req, res) => {
    console.log(req.body);

    let response = await report.create({
      reportedDate: Date.now(),
      title: req.body.title,
      catogery: req.body.option,
      description: req.body.description,
      image:['./uploads/'+req.body.image1]
  
    });
    res.status(200).json({ message: "Data received successfully" });

    // You can now use the data as needed
  });
  app.listen(1337, () => {
    console.log("server is running");
  });
});
