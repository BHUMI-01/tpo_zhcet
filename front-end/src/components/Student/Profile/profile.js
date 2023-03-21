import Table from "react-bootstrap/Table";
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [firstN, setFirst] = useState("");
  const [middleN, setMiddle] = useState("");
  const [lastN, setLast] = useState("");
  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    if (auth) {
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      setFirst(JSON.parse(localStorage.getItem("student")).firstName);
      setMiddle(JSON.parse(localStorage.getItem("student")).middleName);
      setLast(JSON.parse(localStorage.getItem("student")).lastName);
      let result = await fetch(`http://localhost:5000/add-data/${idd}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      setProfiles(result.stdprofile);
      localStorage.setItem("stdprofile", JSON.stringify(result.stdprofile));
    } else {
      navigate("/");
    }
  };
  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
        <MDBCardBody>
          {/* old design part */}
          {/* <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Details</th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>First Name</td>
                <td>{firstN}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Middle Name</td>
                <td>{middleN}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Last Name</td>
                <td>{lastN}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Father's Name</td>
                <td>{profiles.fatherName}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Mother's Name</td>
                <td>{profiles.motherName}</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Date of Birth</td>
                <td>{profiles.dob}</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Gender</td>
                <td>{profiles.gender}</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Enrollment Number</td>
                <td>{profiles.enrollNum}</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Mobile No.</td>
                <td>{profiles.mobNum}</td>
              </tr>
              <tr>
                <td>10</td>
                <td>Alternate No.</td>
                <td>{profiles.alternateNum}</td>
              </tr>
              <tr>
                <td>11</td>
                <td>Disability</td>
                <td>{profiles.disability}</td>
              </tr>
              <tr>
                <td>12</td>
                <td>Aadhaar Number</td>
                <td>{profiles.aadharNum}</td>
              </tr>
              <tr>
                <td>13</td>
                <td>Blood Group</td>
                <td>{profiles.bloodGroup}</td>
              </tr>
              <tr>
                <td>14</td>
                <td>Caste</td>
                <td>{profiles.caste}</td>
              </tr>
              <tr>
                <td>15</td>
                <td>Religion</td>
                <td>{profiles.religion}</td>
              </tr>
            </tbody>
          </Table> */}

          {/* new design part */}
          <MDBRow>
            <MDBCol md={6}>
              <Table striped>
                <tbody>
                  <tr>
                    <td>Name :</td>
                    <td>{firstN} {middleN} {lastN}</td>
                  </tr>
                  <tr>
                    <td>Father's Name :</td>
                    <td>{profiles.fatherName}</td>
                  </tr>
                  <tr>
                    <td>Mother's Name :</td>
                    <td>{profiles.motherName}</td>
                  </tr>
                  <tr>
                    <td>Faculty Number :</td>
                    <td>{profiles.faculty}</td>
                  </tr>
                  <tr>
                    <td>Enrollment Number :</td>
                    <td>{profiles.enrollNum}</td>
                  </tr>
                  <tr>
                    <td>D.O.B :</td>
                    <td>{profiles.dob}</td>
                  </tr>
                  <tr>
                    <td>Gender :</td>
                    <td>{profiles.gender}</td>
                  </tr>
                  <tr>
                    <td>Aadhaar Number :</td>
                    <td>{profiles.aadharNum}</td>
                  </tr>
                  <tr>
                    <td>Course Name :</td>
                    <td>{profiles.course}</td>
                  </tr>
                </tbody>
              </Table>
            </MDBCol>
            <MDBCol md={6}>
              <Table striped>
                <tbody>
                  <tr>
                    <td>Roll Number :</td>
                    <td>{profiles.rollNum}</td>
                  </tr>
                  <tr>
                    <td>Blood Group :</td>
                    <td>{profiles.bloodGroup}</td>
                  </tr>
                  <tr>
                    <td>Disability :</td>
                    <td>{profiles.disability}</td>
                  </tr>
                  <tr>
                    <td>Caste :</td>
                    <td>{profiles.caste}</td>
                  </tr>
                  <tr>
                    <td>Religion :</td>
                    <td>{profiles.religion}</td>
                  </tr>
                  <tr>
                    <td>Mobile NUmber :</td>
                    <td>{profiles.mobNum}</td>
                  </tr>
                  <tr>
                    <td>Alternate Number :</td>
                    <td>{profiles.alternateNum}</td>
                  </tr>
                  <tr>
                    <td>Department: </td>
                    <td>{profiles.department}</td>
                  </tr>
                </tbody>
              </Table>
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ height: "20px" }}></MDBRow>
          <MDBRow>
            <MDBCol>
              <Link to="/student/editstdprofile">
                <MDBBtn>Edit</MDBBtn>
              </Link>
            </MDBCol>
            <MDBCol>
              <Link to="/stddash">
                <MDBBtn>Back</MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Profile;
