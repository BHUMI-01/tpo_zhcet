import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import Nabvar from '../navbar/Navbar';
const Compregister = () => {
  const [username, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const collectData = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/comp-register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        username,
        email,
        password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {

          localStorage.setItem("recruiter", JSON.stringify(data.data.company));
          localStorage.setItem("token", JSON.stringify(data.data.token));
          alert("Registration Successful");
          navigate('/');
        } else {
          alert("Something went wrong");
        }
      });
  }


  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form onSubmit={collectData}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                  <label>Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={username}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <MDBRow className="mb-3">
                  <label>Business Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </MDBRow>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary"
                    >
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Already registered <a href="/complogin">sign in?</a>
                </p>
              </form>
            </MDBCol>
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src="./training.jpeg" fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Compregister;
