import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

const Addadmin = () => {
  const [username, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const collectData = async () => {
    let result = await fetch("http://localhost:5000/comp-register", {
      method: 'post',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    if (result.result === "user already enrolled") {
      alert("User Already Registered");
    }
    else if (result.result === "Something is wrong!") {
      alert("Something is wrong! Please try it again!!");
    }
    else {
      localStorage.setItem("recruiter", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      // navigate('/student/addstdprofile');
    }
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
              <form>
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
                    onClick={() => collectData()}>
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

export default Addadmin;
