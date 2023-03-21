import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md={6}>
          <MDBCard className='text-black m-5' style={{ borderRadius: '0px' }}>
            <MDBCardBody style={{ textAlign: "center" }}>
              <Link to="/admin/addJob">
                <MDBBtn>Jobs</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md={6}>
          <MDBCard className='text-black m-5' style={{ borderRadius: '0px' }}>
            <MDBCardBody style={{ textAlign: "center" }}>
              <Link to="/admin/addEvent">
                <MDBBtn>Events</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Notification;
