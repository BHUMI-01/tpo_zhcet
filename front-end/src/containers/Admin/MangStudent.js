import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import QRCode from "react-qr-code";

const MangStudent = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [searchkey, setKey] = useState("");
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiles = async () => {
    if (auth) {
      let result = await fetch(`http://localhost:5000/get-student/`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      
      setProfiles(result);
    } else {
      navigate("/");
    }
  };

  const items = profiles;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item._id}>
              <MDBCard style={{ borderRadius: "0px" }}>
                <MDBCardBody>
                  <MDBRow style={{ padding: "20px" }}>
                    <MDBCol md={2}>
                      <img src="" alt="pic" style={{ height: "auto", width: "auto" }} />
                    </MDBCol>
                    <MDBCol md={8}>
                      <h6>Name: {item.username}</h6>
                      <h6>Branch: </h6>
                      <h6>Faculty No: </h6>
                      <h6>Enrollment No: </h6>
                      <h6>Contact: </h6>
                      <h6>Email: {item.email}</h6>
                      <h6>Skills: </h6>
                      <h6>CPI: </h6>
                    </MDBCol>
                    <MDBCol md={2}>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "70%" }}
                        value="0"
                        viewBox={`0 0 256 256`}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBRow style={{ height: "10px" }} />
            </div>
          ))}
        <MDBRow style={{ height: "40px" }} />
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <MDBRow style={{ paddingLeft: "35%" }}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </MDBRow>
      </>
    );
  }
  return (
    <MDBContainer>
      <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol>
              <MDBInput
                id="fname"
                label="Filter By:"
                type="text"
                value={searchkey}
                onChange={(e) => setKey(e.target.value)} ></MDBInput>
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="fname"
                label="Filter By:"
                type="text"
                value={searchkey}
                onChange={(e) => setKey(e.target.value)} ></MDBInput>
            </MDBCol>
            <MDBCol><MDBBtn>Search</MDBBtn></MDBCol>
          </MDBRow><hr/>
          <MDBRow style={{ height: "40px" }} />

          <PaginatedItems itemsPerPage={4} />

          <MDBRow style={{ height: "40px" }} />
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

export default MangStudent;
