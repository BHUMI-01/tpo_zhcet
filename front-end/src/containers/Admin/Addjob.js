import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBCol,
  MDBTextArea
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const AddJob = () => {
  const navigate = useNavigate();
  const [companyName, setcompanyName] = useState("");
  const [position, setposition] = useState("");
  const [lastApplyDate, setlastApplyDate] = useState("");
  const [requirements, setrequirements] = useState("");
  const [stipend, setstipend] = useState("");
  const [supportiveDocs, setsupportiveDocs] = useState("");
  const [description, setdescription] = useState("");
  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (authorize) {
      getJobs();
    } else {
      navigate("/");
    }
  }, []);

  const getJobs = async () => {
    let result = JSON.parse(localStorage.getItem("jobs"));
    if (result) {
      setcompanyName(result.companyName);
      setposition(result.position);
      setstipend(result.stipend);
      setlastApplyDate(result.lastApplyDate);
      setdescription(result.description);
      setrequirements(result.requirements);
    }
  };

  const set_Job = async () => {
    const profi = JSON.stringify({
      companyName,
      position,
      lastApplyDate,
      requirements,
      stipend,
      supportiveDocs,
      description,
    });
    localStorage.setItem("jobs", profi);
  };

  const covertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setsupportiveDocs(reader.result);
    };
  };

  const uploadJob = async () => {
    await fetch("http://localhost:5000/upload-job", {
      method: "post",
      body: JSON.stringify({
        companyName,
        position,
        lastApplyDate,
        requirements,
        stipend,
        supportiveDocs,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              ADD JOB OPPORTUNITY
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form onSubmit={uploadJob}>
            <MDBRow>
              <MDBCol>
                <label>Company Name: </label>
                <MDBInput
                  id="companyName"
                  required
                  type="text"
                  value={companyName}
                  onChange={(e) => setcompanyName(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Position Name: </label>
                <MDBInput
                  id="position"
                  required
                  type="text"
                  value={position}
                  onChange={(e) => setposition(e.target.value)}
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Last Date For Registration: </label>
                <MDBInput
                  id="lastApplyBy"
                  required
                  type="date"
                  value={lastApplyDate}
                  onChange={(e) => setlastApplyDate(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Stipend : </label>
                <MDBInput
                  id="stipend"
                  required
                  type="text"
                  value={stipend}
                  onChange={(e) => setstipend(e.target.value)}
                ></MDBInput>
              </MDBCol>
              
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Upload SupportiveDocs: </label>
                <input
                  id="supportivedoc"
                  accept=".pdf, .jpg, .jpeg, .doc"
                  type="file"
                  onChange={covertToBase64}
                ></input>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Requirements: </label>
                <MDBTextArea
                  id="description"
                  required
                  type="text"
                  value={requirements}
                  rows={4}
                  onChange={(e) => setrequirements(e.target.value)}
                ></MDBTextArea>
              </MDBCol>
              <MDBCol>
                <label>Description: </label>
                <MDBTextArea
                  id="description"
                  required
                  type="text"
                  rows={4}
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                ></MDBTextArea>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBBtn type="submit" onClick={set_Job}>
                  Save
                </MDBBtn>
              </MDBCol>
              <MDBCol>
                <Link to="/admin/notification">
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

export default AddJob;
