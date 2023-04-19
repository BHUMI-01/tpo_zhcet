import React, { useState, useEffect } from 'react'
import {
  MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody,
  MDBCard, MDBCardBody
} from 'mdb-react-ui-kit';
import Side from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import Nabvar from '../components/navbar/Navbar';
const Page = () => {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getData = async () => {
    if (authorize) {
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      let result = await fetch(`https://mernbackend-2bxw.onrender.com/add-data/${idd}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      setData(result);
    } else {
      navigate("/");
    }
  };


  return (
    <div>
      <Nabvar/>
      <MDBRow>
        <MDBCol md={2}>
          <Side />
        </MDBCol>
        <MDBCol>
          <MDBCard className="text-black m-5">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md={3}>
                  <img src='./AMU.png' alt='img' style={{ borderRadius: "25px solid", height: "200px" }} />
                </MDBCol>
                <MDBCol md={9}>
                  <MDBRow>
                    <h3>{data.username}</h3>
                  </MDBRow>
                  <MDBRow style={{ height: "20px" }}></MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {/* <h6>Faculty Number : {data.stdprofile.faculty}</h6>
                      <h6>Course Name : {data.stdprofile.course}</h6>
                      <h6>Department : {data.stdprofile.department}</h6> */}
                    </MDBCol>
                    <MDBCol>
                      <h6><i className="fa-solid fa-envelope"></i> Email : {data.email}</h6>
                      {/* <h6><i className="fa-solid fa-phone"></i> Contact No : {data.stdprofile.mobNum}</h6> */}
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="text-black m-5">
            <MDBCardBody>
              {/* 1st row */}
              <MDBTable striped>
                <MDBTableHead>
                  <tr>
                    <th>Company Name</th>
                    <th>Postition</th>
                    <th>Job Type</th>
                    <th>Apply By</th>
                    <th>Application status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>



        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Page
