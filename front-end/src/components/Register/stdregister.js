import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

const Stdregister = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate('/onetimeform/addstdprofile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const collectData = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: 'post',
      body: JSON.stringify({ firstName, middleName, lastName, email, password, passwordConfirm }),
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
      localStorage.setItem("student", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      // navigate('/student/addstdprofile');
    }
  }

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>

            {/* 1st half part of the register page */}
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form>
                <h3>Sign Up</h3>
                <div className="mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Middle name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                  />
                </div>

                {/* submit button of the register page */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary"
                  onClick={() => collectData()}>
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right">
                Already registered <a href="/stdlogin">sign in?</a>
              </p>
              {/* 1st half part ends here */}

              </form>
            </MDBCol>

            {/* 2nd half part of the register page */}
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src="./training.jpeg" fluid />
              {/* 2nd half part ends here */}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Stdregister;
