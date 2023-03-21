import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBRow,
    MDBCol,
    MDBTableBody
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Qualification = () => {
    const authorize = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [qualifies, setQualify] = useState([]);
    useEffect(() => {
        getQualify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getQualify = async () => {
        if (authorize) {
            const idd = JSON.parse(localStorage.getItem("student"))._id;
            let result = await fetch(`http://localhost:5000/add-data/${idd}`, {
                headers: {
                    "authorization": JSON.parse(localStorage.getItem("token")),
                },
            });
            result = await result.json();
            setQualify(result.stdeducat);
            localStorage.setItem("stdqualify", JSON.stringify(result.stdeducat));
        }
        else {
            navigate("/");
        }
    }

    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5'>
                <MDBCardBody style={{ height: '40px', width: '400px', }}>
                </MDBCardBody>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol><h5>Academic Qualification List</h5></MDBCol>
                        <MDBCol>
                            <Link to="/stddash">
                                <MDBBtn>Back</MDBBtn>
                            </Link>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    {/* <MDBTable striped>
                        <MDBTableHead>
                            <tr>
                                <th>Qualification Level</th>
                                <th>School / University Name</th>
                                <th>Area of study</th>
                                <th>Year of Passing</th>
                                <th>Roll No.</th>
                                <th>Board</th>
                                <th>Result</th>
                                <th>Grading Type</th>
                                <th>Grade</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                qualifies.result == "No User Found" ?
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    :
                                    qualifies.map((item) =>
                                        <tr key={item._id}>
                                            <td>{item.qualifyLevel}</td>
                                            <td>-</td>
                                            <td>{item.qualifyName}</td>
                                            <td>{item.passYear}</td>
                                            <td>{item.rollNum}</td>
                                            <td>{item.board}</td>
                                            <td>{item.resultStatus}</td>
                                            <td>{item.gradeSys}</td>
                                            <td>{item.grade}</td>
                                            <td><Link to={`/student/editstdqualify/${item._id}`}><MDBBtn>edit</MDBBtn></Link></td>
                                        </tr>
                                    )
                            }
                        </MDBTableBody>
                    </MDBTable> */}

                    <MDBTable striped>
                        <MDBTableBody>
                            {
                                qualifies.map((item) =>
                                    <MDBRow>
                                        <MDBCol md={2} style={{ textAlign: 'center', paddingTop: "10%" }}>{item.qualifyLevel}</MDBCol>

                                        <MDBCol md={10}>
                                            <MDBRow>
                                                <MDBCol>
                                                    <MDBTable striped>
                                                        <MDBTableBody>
                                                            <tr>
                                                                <td>Qualification Level :</td>
                                                                <td>{item.qualifyLevel}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>School Name :</td>
                                                                <td>{item.qualifyName}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Area of study :</td>
                                                                <td>-</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Roll Number:</td>
                                                                <td>{item.rollNum}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Pass Year :</td>
                                                                <td>{item.passYear}</td>
                                                            </tr>
                                                        </MDBTableBody>
                                                    </MDBTable>
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBTable striped>
                                                        <MDBTableBody>
                                                            <tr>
                                                                <td>Board Name:</td>
                                                                <td>{item.board}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Grading System : :</td>
                                                                <td>{item.gradeSys}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Grade:</td>
                                                                <td>{item.grade}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Result:</td>
                                                                <td>{item.resultStatus}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Action :</td>
                                                                <td><Link to={`/student/editstdqualify/${item._id}`}>Edit</Link></td>
                                                            </tr>
                                                        </MDBTableBody>
                                                    </MDBTable>
                                                </MDBCol>
                                            </MDBRow>
                                            {/* <tr key={item._id}>
                                                <td>{item.qualifyLevel}</td>
                                                <td>-</td>
                                                <td>{item.qualifyName}</td>
                                                <td>{item.passYear}</td>
                                                <td>{item.rollNum}</td>
                                                <td>{item.board}</td>
                                                <td>{item.resultStatus}</td>
                                                <td>{item.gradeSys}</td>
                                                <td>{item.grade}</td>
                                                <td><Link to={`/student/editstdqualify/${item._id}`}><MDBBtn>edit</MDBBtn></Link></td>
                                            </tr> */}
                                        </MDBCol>
                                        <hr />
                                    </MDBRow>
                                )
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer >
    )
}

export default Qualification
