import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Editqualify = () => {
  const [qualifyLevel, setqualifyLevel] = useState("");
  const [qualifyName, setqualifyName] = useState("");
  const [passYear, setpassYear] = useState("");
  const [board, setBoard] = useState("");
  const [rollNum, setrollNum] = useState("");
  const [resultStatus, setResultStatus] = useState("");
  const [gradeSys, setgradeSys] = useState("");
  const [grade, setGrade] = useState("");
  const { id } = useParams();
  const authorize = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  let i = 0;
  let varvalue;
  useEffect(() => {
    getQualifyDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setvalue = () => {
    setqualifyLevel(varvalue[i].qualifyLevel);
    setpassYear(varvalue[i].passYear);
    setqualifyName(varvalue[i].qualifyName);
    setBoard(varvalue[i].board);
    setrollNum(varvalue[i].rollNum);
    setResultStatus(varvalue[i].resultStatus);
    setgradeSys(varvalue[i].gradeSys);
    setGrade(varvalue[i].grade);
  }

  const getQualifyDetails = async () => {
    if (authorize) {
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      let resu = await fetch(`http://localhost:5000/add-data/${idd}`, {
        headers: {
          "authorization": JSON.parse(localStorage.getItem("token")),
        },
      });
      resu = await resu.json();
      varvalue = resu.stdeducat;
      let len = varvalue.length;

      for (i = 0; i < len; i++) {
        if (varvalue[i]._id == id) {
          setvalue();
        }
      }
    }
    else {
      navigate("/");
    }
  };

  const update_qualify = async () => {
    const idd = JSON.parse(localStorage.getItem("student"))._id;
    await fetch(`http://localhost:5000/update-data/${idd}`, {
      method: "put",
      body: JSON.stringify({
        stdeducat: { qualifyLevel, qualifyName, passYear, board,
          rollNum, resultStatus, gradeSys, grade, }
      }),
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.parse(localStorage.getItem("token")),
      },
    }
    );
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5">
        <MDBCardBody>
          <form>
            <MDBRow>
              <MDBCol>Qualification Details</MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol>
                <label>Qualification Level :</label>
                <select
                  className="form-control select2"
                  name="qualification"
                  id="qualification"
                  required
                  aria-hidden="true"
                  value={qualifyLevel}
                  onChange={(e) => setqualifyLevel(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="High School">High School</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="B.Tech">
                    B.Tech
                  </option>
                  <option value="M.Tech">M.Tech</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Course Name</label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={qualifyName}
                  onChange={(e) => setqualifyName(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>

            <MDBRow>
              <MDBCol>
                <label>Year Of Passing:</label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={passYear}
                  maxLength="4"
                  pattern="[0-9]+"
                  onChange={(e) => setpassYear(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Roll No :</label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={rollNum}
                  pattern="[0-9]*[a-zA-Z]*[0-9]+"
                  onChange={(e) => setrollNum(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>

            <MDBRow>
              <MDBCol>
                <label>Board :</label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Result :</label>
                <select
                  className="form-control select2"
                  name="result"
                  id="result"
                  required
                  aria-hidden="true"
                  value={resultStatus}
                  onChange={(e) => setResultStatus(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                  <option value="Awaited">Awaited</option>
                </select>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>

            <MDBRow>
              <MDBCol>
                <label>Grading System :</label>
                <select
                  className="form-control select2"
                  name="grading system"
                  id="grading system"
                  required
                  aria-hidden="true"
                  value={gradeSys}
                  onChange={(e) => setgradeSys(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="CPI">CPI</option>
                  <option value="CGPA">CGPA</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Grade / % :</label>
                <MDBInput
                  id="enumber"
                  type="text"
                  value={grade}
                  pattern="[0-9]+"
                  onChange={(e) => setGrade(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBBtn type="submit" onClick={() => { update_qualify(); }}>
                  Update
                </MDBBtn>
              </MDBCol>
              <MDBCol>
                <Link to="/student/stdqualify">
                  <MDBBtn>Back</MDBBtn>
                </Link>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Editqualify;
