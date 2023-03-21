import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBCol,
    MDBRow
} from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';

function About() {
    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5'>
                <MDBCardBody>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                        <MDBCol md='8' >
                            <MDBRow>
                                <h3 className='mainh1'>Training And Placement (ZHCET)</h3>
                                <hr />
                            </MDBRow>
                            <MDBRow style={{ height: "20px" }}></MDBRow>
                            <MDBRow>
                                <img src='https://api.amu.ac.in/storage//images/10166/slider/1616226469_2.jpg'
                                    className='mainimg' alt='img' />
                            </MDBRow>
                            <MDBRow style={{ height: "30px" }}></MDBRow>
                            <MDBRow>
                                <h4>HOME PAGE</h4>
                                <hr />
                            </MDBRow>
                            <MDBRow style={{ height: "20px" }}></MDBRow>
                            <MDBRow>
                                <p style={{ width: "900px", textAlign: "justify" }}>
                                    The Training and Placement Office provides job opportunities, arranges Campus Interviews
                                    by various Government Departments and Companies of National and International repute.
                                    Students take the help of this office for their Training and Employment. It also caters
                                    to the need of Instructional and Industrial requirements through state of the art facilities,
                                    new technologies and human resources in collaboration with all the Department of studies.
                                </p>
                            </MDBRow>
                        </MDBCol>

                        <MDBCol md='4'>
                            <MDBRow>
                                <img alt="ph" src="./saeed.jpg" className='user-img-head' style={{ width: '400px', height: '400px' }} />
                            </MDBRow>
                            <MDBRow>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th style={{color: "white", backgroundColor: 'red',}}>Mr. Fareed Sir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Trainning & Placement Officier</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </MDBRow>
                            <MDBRow style={{ height: "20px" }}></MDBRow>
                            {/* <MDBRow>
                                <h2>Related Links</h2>
                                <a href="/training-and-placement/zhcet/home-page">Home Page</a>
                                <a href="https://www.amu.ac.in/training-and-placement/zhcet/staff-members">Staff Members</a>
                                <a href="https://www.amu.ac.in/training-and-placement/zhcet/notice-and-circular">Notice and Circular</a>
                                <a href="https://www.amu.ac.in/training-and-placement/zhcet/useful-download">Useful Download</a>
                            </MDBRow> */}
                            <MDBRow></MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}

export default About
