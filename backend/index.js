const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWTKEY;

dotenv.config({ path: './config.env' });
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

// middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

//student register and login - register
app.post("/register", async (req, resp) => {
  try {
    let student = await Student.findOne(req.body);

    if (student) {
      return resp.send({ result: "user already enrolled" });
    } else {
      let student = new Student(req.body);
      let result = await student.save();
      result = result.toObject();
      delete result.password;
      Jwt.sign({ result }, jwtKey, { expiresIn: "7h" }, (err, token) => {
        if (err) {
           resp.send({ result: "Something is wrong!" });
        }
         resp.send({ result, auth: token });
      });
    }
  } catch (err) {
    console.log(err);
    return resp.send({ result: "Something is wrong!" });
  }
});

// student register and login - login
app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let student = await Student.findOne(req.body).select("-password");
    if (student) {
      Jwt.sign({ student }, jwtKey, { expiresIn: "7h" }, (err, token) => {
        if (err) {
           resp.send({ result: "Something is wrong!" });
        }
         resp.send({ student, auth: token });
      });
    } else {
      return resp.send({ result: "No User Found" });
    }
  } else {
    return resp.send({ result: "No User Found" });
  }
});

//company register and login - register
app.post("/comp-register", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let comp = await Admin.findOne(req.body);

    if (comp) {
      resp.send({ result: "user already enrolled" });
    } else {
      let comp = new Admin(req.body);
      let result = await comp.save();
      result = result.toObject();
      delete result.password;
      Jwt.sign({ result }, jwtKey, { expiresIn: "7h" }, (err, token) => {
        if (err) {
          resp.send({ result: "Something is wrong!" });
        }
        resp.send({ result, auth: token });
      });
    }
  } else {
    let comp = new Admin(req.body);
    let result = await comp.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "7h" }, (err, token) => {
      if (err) {
        resp.send({ result: "Something is wrong!" });
      }
      resp.send({ result, auth: token });
    });
  }
});

//company register and login - login
app.post("/comp-login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let recruiter = await Admin.findOne(req.body).select("-password");
    if (recruiter) {
      Jwt.sign({ recruiter }, jwtKey, { expiresIn: "7h" }, (err, token) => {
        if (err) {
          resp.send({ result: "Something is wrong!" });
        }
        resp.send({ recruiter, auth: token });
      });
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

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

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    Jwt.verify(token, jwtKey, (err, valid) => {
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
    resp.send(posts)
  }
  else {
    resp.send({ result: "No Events Found!" })
  }
});

app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
})
