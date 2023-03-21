import React, { useEffect } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBBtnGroup,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Admin() {
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
                        <h2 className='text-center bg-success text-bg-dark p-2'>Admin PANEL</h2>
                        <MDBRow>
                            <MDBRow style={{ height: "40px" }}/>
                            <MDBBtnGroup horizontal="true" style={{ padding: "10px" }}>
                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/admin/manageadmin"><i className="fa-regular fa-circle"> Manage Admins</i></Link>
                                </MDBCol>

                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/admin/managestd"><i className="fa-regular fa-circle"> Manage Student</i></Link>
                                </MDBCol>

                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/admin/managecomp"><i className="fa-regular fa-circle"> Manage Recruiters</i></Link>
                                </MDBCol>

                                <MDBCol md={3} style={{ textAlign: "center" }}>
                                    <Link to="/admin/notification"><i className="fa-regular fa-circle"> Manage Notification</i></Link>
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

export default Admin