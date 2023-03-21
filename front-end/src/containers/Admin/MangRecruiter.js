import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBTable,
  MDBTableBody,
  MDBCardBody,
  MDBCol,
  MDBTableHead
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const MangRecruiter = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    if (auth) {
      let result = await fetch(`http://localhost:5000/get-recruit/`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      console.log(result);
      setProfiles(result);
    } else {
      navigate("/");
    }
  };

  const items = profiles;
  function Items({ currentItems }) {
    return (
      <>
        <MDBTable striped>
          <MDBTableHead>
            <th style={{ fontWeight: "bold" }}>Admin Name</th>
            <th style={{ fontWeight: "bold" }}>Email</th>
            <th style={{ fontWeight: "bold" }}>Created At</th>
            <th style={{ fontWeight: "bold" }}>Edit</th>
            <th style={{ fontWeight: "bold" }}>Remove</th>
          </MDBTableHead>
          <MDBTableBody>
            {currentItems &&
              currentItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.created_at}</td>
                  <td>
                    <MDBBtn><i className="fa-solid fa-pen-to-square"></i> </MDBBtn>
                  </td>
                  <td>
                    <MDBBtn><i className="fa-solid fa-trash"></i></MDBBtn>
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
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
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
        <MDBCardBody>
          <PaginatedItems itemsPerPage={4} />
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

export default MangRecruiter;
