import React, { useEffect } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBBtnGroup,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Recruiter() {
    const authorize = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    useEffect(() => {
        if (!authorize) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MDBRow>
            <MDBCol>
                <MDBCard style={{ borderRadius: "0px" }}>
                    <MDBCardBody>
                        <h2 className='text-center bg-success text-bg-dark p-2'>Recruiter PANEL</h2>
                        <MDBRow>
                            <MDBRow style={{ height: "40px" }}/>
                            <MDBBtnGroup horizontal="true" style={{ padding: "10px" }}>
                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/recruiter/addJOB"><i className="fa-regular fa-circle"> Manage JOB</i></Link>
                                </MDBCol>

                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/recruiter/dashrecruiter"><i className="fa-regular fa-circle"> Manage Profile</i></Link>
                                </MDBCol>

                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/recruiter/addEVENT"><i className="fa-regular fa-circle"> Manage Event</i></Link>
                                </MDBCol>

                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/recruiter/sendmail"><i className="fa-regular fa-circle"> Send Mail</i></Link>
                                </MDBCol>

                            </MDBBtnGroup>
                        </MDBRow>

                        <MDBRow>
                            <Outlet/>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}

export default Recruiter