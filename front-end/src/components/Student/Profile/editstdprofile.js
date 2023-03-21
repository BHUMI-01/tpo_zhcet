import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Editstdprofile = () => {
  const [fatherName, setfatherName] = useState("");
  const [motherName, setmotherName] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [department, setDepartmnet] = useState("");
  const [rollNum, setrollNum] = useState("");
  const [course, setCourse] = useState("");
  const [faculty, setFacultyNum] = useState("");
  const [enrollNum, setenrollNum] = useState("");
  const [mobNum, setmobNum] = useState("");
  const [alternateNum, setalternateNum] = useState("");
  const [disability, setDisability] = useState("");
  const [aadharNum, setaadharNum] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [caste, setcaste] = useState("");
  const [religion, setreligion] = useState("");
  const [firstN, setFirst] = useState("");
  const [lastN, setLast] = useState("");
  const [middleN, setMiddle] = useState("");
  const authorize = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    if (authorize) {
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      setFirst(JSON.parse(localStorage.getItem("student")).firstName);
      setMiddle(JSON.parse(localStorage.getItem("student")).middleName);
      setLast(JSON.parse(localStorage.getItem("student")).lastName);
      let result = await fetch(`http://localhost:5000/add-data/${idd}`, {
        headers: {
          "authorization": JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      setfatherName(result.stdprofile.fatherName);
      setmotherName(result.stdprofile.motherName);
      setDisability(result.stdprofile.disability);
      setDepartmnet(result.stdprofile.department);
      setrollNum(result.stdprofile.rollNum);
      setCourse(result.stdprofile.course);
      setFacultyNum(result.stdprofile.faculty);
      setaadharNum(result.stdprofile.aadharNum);
      setalternateNum(result.stdprofile.alternateNum);
      setmobNum(result.stdprofile.mobNum);
      setenrollNum(result.stdprofile.enrollNum);
      setbloodGroup(result.stdprofile.bloodGroup);
      setcaste(result.stdprofile.caste);
      setdob(result.stdprofile.dob);
      setgender(result.stdprofile.gender);
      setreligion(result.stdprofile.religion);
    }
    else {
      navigate("/");
    }
  };

  const update_profile = async () => {
    const idd = JSON.parse(localStorage.getItem("student"))._id;
    await fetch(`http://localhost:5000/update-data/${idd}`, {
      method: "put",
      body: JSON.stringify({
        stdprofile: {
          fatherName, motherName, gender, dob, enrollNum, mobNum, alternateNum, disability, aadharNum,
          bloodGroup, caste, religion, faculty, rollNum, department, course,
        }
      }),
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.parse(localStorage.getItem("token")),
      },
    });
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", }}>EDIT PROFILE</MDBCol>
          </MDBRow>
          <hr />
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form>
            <MDBRow>
              <MDBCol>
                <label>First Name: </label>
                <MDBInput
                  id="firstname"
                  required
                  type="text"
                  value={firstN}
                  disabled
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Middle Name: </label>
                <MDBInput
                  id="middlename"
                  value={middleN}
                  type="text"
                  disabled
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Last Name: </label>
                <MDBInput
                  id="lastname"
                  value={lastN}
                  required
                  type="text"
                  disabled
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Father's Name: </label>
                <MDBInput
                  id="fname"
                  type="text"
                  value={fatherName}
                  onChange={(e) => setfatherName(e.target.value)}
                  pattern="[a-zA-Z][a-zA-Z ]+"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Mother's Name: </label>
                <MDBInput
                  id="mname"
                  type="text"
                  value={motherName}
                  onChange={(e) => setmotherName(e.target.value)}
                  pattern="[a-zA-Z][a-zA-Z ]+"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Blood Group: </label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setbloodGroup(e.target.value)}
                  pattern="(A|B|AB|0)[+-]$"
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Department: </label>
                <MDBInput
                  id="fname"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartmnet(e.target.value)}
                  pattern="[A-Z][a-zA-Z ]+"
                  title="For example: Computer Engineering, First letter should be capital"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Faculty Number: </label>
                <MDBInput
                  id="mname"
                  type="text"
                  value={faculty}
                  maxLength="8"
                  onChange={(e) => setFacultyNum(e.target.value)}
                  title="For example: 19COB001"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Roll Number: </label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={rollNum}
                  onChange={(e) => setrollNum(e.target.value)}
                  maxLength="5"
                  pattern="[A-Z]+[0-9]{4}"
                  title="For example: A7667, FIRST LETTER SHOULD BE CAPITAL"
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Date</label>
                <MDBInput
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Enrollment No:</label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={enrollNum}
                  onChange={(e) => setenrollNum(e.target.value)}
                  maxLength="6"
                  pattern="[A-Z][A-Z]+[0-9]{4}"

                  required
                ></MDBInput>
              </MDBCol>

              <MDBCol>
                <label>Aadhaar No.: </label>
                <MDBInput
                  id="mnumber"
                  type="tel"
                  value={aadharNum}
                  onChange={(e) => setaadharNum(e.target.value)}
                  pattern="[0-9]+"
                  maxLength="12"
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label className="required" htmlFor="disability">
                  Disability:{" "}
                </label>
                <select
                  className="form-control select2"
                  name="disability"
                  id="disability"
                  required
                  aria-hidden="true"
                  value={disability}
                  onChange={(e) => setDisability(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Religion: </label>
                <select
                  className="form-control select2"
                  name="religion"
                  id="religion"
                  required
                  aria-hidden="true"
                  value={religion}
                  onChange={(e) => setreligion(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Budhist">Budhist</option>
                  <option value="other2">other</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Caste: </label>
                <select
                  className="form-control select2"
                  name="caste"
                  id="caste"
                  required
                  aria-hidden="true"
                  value={caste}
                  onChange={(e) => setcaste(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="GEN">GEN</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="GEN-EWS">GEN-EWS</option>
                  <option value="OBC">OBC</option>
                  <option value="other">other</option>
                </select>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label className="required" htmlFor="gender">
                  Gender:{" "}
                </label>
                <select
                  className="form-control select2"
                  name="gender"
                  id="gender"
                  required
                  aria-hidden="true"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Male">MALE</option>
                  <option value="Female">FEMALE</option>
                  <option value="Other">Other</option>
                </select>
              </MDBCol>

              <MDBCol>
                <label>Mobile Number</label>
                <PhoneInput
                  country={"in"}
                  value={mobNum}
                  onChange={setmobNum}
                />
              </MDBCol>
              <MDBCol>
                <label>Alternate Number</label>
                <PhoneInput
                  country={"in"}
                  value={alternateNum}
                  onChange={setalternateNum}
                />
              </MDBCol>
            </MDBRow>
            
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label className="required" htmlFor="disability">
                  Course Name:{" "}
                </label>
                <select
                  className="form-control select2"
                  name="course"
                  id="course"
                  required
                  aria-hidden="true"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>

            <MDBRow></MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBBtn
                    type="submit"
                    onClick={() => { update_profile(); }}
                  >
                    Update
                  </MDBBtn>
                </MDBCol>
                <MDBCol>
                  <Link to='/student/stdprofile'><MDBBtn>Back</MDBBtn></Link>
                </MDBCol>
              </MDBRow>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Editstdprofile;
