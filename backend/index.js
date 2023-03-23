const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWTKEY;

dotenv.config({ path: "./config.env" });
require("./db/config");
const Student = require("./models/students/Student");
const EventPost = require("./models/Notification/EventPost");
const Admin = require("./models/Admin/Admin");
const Student_Data = require("./models/students/Student_Data");
const Jobs = require("./models/Notification/JobPost");
const { valid } = require("joi");
const PORT = process.env.PORT;
const Images = require("./models/students/imageupload");
// const Student_File_Uplod = require('./models/students/Student_File_Upload');
const bcrypt = require("bcryptjs");
// middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

//student register and login - register
app.post("/register", async (req, res) => {
  const { firstName, middleName, lastName, email, password, passwordConfirm } =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await Student.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    const student = await Student.create({
      firstName,
      middleName,
      lastName,
      email,
      password: encryptedPassword,
    });
    const token = Jwt.sign({ student }, process.env.JWTKEY, {
      expiresIn: "7h",
    });
    res.send({ status: "ok", data: { student, token } });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// student register and login - login
app.post("/login", async (req, resp) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
  if (!user) {
    return resp.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = Jwt.sign({ email: user.email }, process.env.JWTKEY, {
      expiresIn: "15h",
    });

    if (resp.status(201)) {
      return resp.json({ status: "ok", data: { user, token } });
    } else {
      return resp.json({ error: "error" });
    }
  }
  resp.json({ status: "error", error: "InvAlid Password" });
});

//company register and login - register
app.post("/comp-register", async (req, resp) => {

    const { username, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      const oldUser = await Admin.findOne({ email });

      if (oldUser) {
        return resp.json({ error: "User Exists" });
      }
      const recruiter = await Admin.create({
        username,
        email,
        password: encryptedPassword,
      });
      const token = Jwt.sign({ recruiter }, process.env.JWTKEY, {
        expiresIn: "7h",
      });
      resp.send({ status: "ok", data: { recruiter, token } });
    } catch (error) {
      resp.send({ status: "error" });
    }
  
});

//company register and login - login
app.post("/comp-login", async (req, resp) => {
  const { email, password } = req.body;

  const recruiter = await Admin.findOne({ email });
  if (!recruiter) {
    return resp.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, recruiter.password)) {
    const token = Jwt.sign({ email: recruiter.email }, process.env.JWTKEY, {
      expiresIn: "15h",
    });

    if (resp.status(201)) {
      return resp.json({ status: "ok", data: { recruiter, token } });
    } else {
      return resp.json({ error: "error" });
    }
  }
  resp.json({ status: "error", error: "InvAlid Password" });
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    Jwt.verify(token, process.env.JWTKEY, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please enter a valid token!" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please enter a token!" });
  }
}

//Experimental nested scheme
app.post("/add-data", verifyToken, async (req, resp) => {
  let student = new Student_Data(req.body);
  let result = await student.save();
  resp.send(result);
});

app.get("/add-data/:id", verifyToken, async (req, resp) => {
  const data = await Student_Data.findOne({ studentId: req.params.id });
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.put("/update-data/:id", verifyToken, async (req, resp) => {
  const result = await Student_Data.updateOne(
    { studentId: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/add-data-qualify/:id", verifyToken, async (req, resp) => {
  const data = await Student_Data.find({ "stdeducat._id": req.params.id });
  console.log(data);
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.post("/upload-image", verifyToken, async (req, res) => {
  const { studentId, stdupload } = req.body;
  try {
    await Images.create({ studentId, stdupload });
    res.send({ Status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

app.get("/get-image/:id", verifyToken, async (req, resp) => {
  const data = await Images.findOne({ studentId: req.params.id });
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No User Found" });
  }
});
app.put("/update-image/:id", verifyToken, async (req, resp) => {
  let result = await Images.updateOne(
    { studentId: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/get-admins", verifyToken, async (req, resp) => {
  const data = await Admin.find({ role: "admin" });
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.get("/get-recruit", verifyToken, async (req, resp) => {
  const data = await Admin.find({ role: "recruiter" });
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.get("/get-student", verifyToken, async (req, resp) => {
  const data = await Student.find();
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No User Found" });
  }
});

//APIS FOR JOB SCHEMA

app.post("/upload-job", verifyToken, async (req, resp) => {
  const {
    companyName,
    position,
    lastApplyDate,
    requirements,
    stipend,
    supportiveDocs,
    description,
  } = req.body;
  try {
    await Jobs.create({
      companyName,
      position,
      lastApplyDate,
      requirements,
      stipend,
      supportiveDocs,
      description,
    });
    resp.send({ Status: "ok" });
  } catch (error) {
    resp.send({ Status: "error", data: error });
  }
});

app.get("/get-job", verifyToken, async (req, resp) => {
  const data = await Jobs.find();
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No Job Found" });
  }
});

app.put("/update-job/:id", verifyToken, async (req, resp) => {
  let result = await Jobs.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

// api for the event post
// post request api
app.post("/add-event-post", async (req, resp) => {
  let posts = new EventPost(req.body);
  let result = await posts.save();
  resp.send(result);
});
//get request api
app.get("/get-event-post", async (req, resp) => {
  const posts = await EventPost.find();
  if (posts) {
    resp.send(posts);
  } else {
    resp.send({ result: "No Events Found!" });
  }
});

app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
