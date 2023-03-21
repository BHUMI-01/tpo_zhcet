import React, { useEffect, useState } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { pdfjs } from "react-pdf";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function UPLOAD() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  var Images = [];
  var uploadImages = JSON.parse(localStorage.getItem("upload"));
  const [type, settype] = useState("");
  const navigate = useNavigate();
  const idd = JSON.parse(localStorage.getItem("student"))._id;
  const uploaded = JSON.parse(localStorage.getItem("upload"));
  var [uploads, setuploads] = useState([]);

  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (authorize) {
      get_documents();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_documents = async () => {
    let result = await fetch(`http://localhost:5000/get-image/${idd}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setuploads(result.stdupload);
    console.log(result.stdupload);
  };

  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.id);
    reader.onload = () => {
      console.log(reader.result);
      var Name = `${e.target.files[0].name}`;
      const Index = uploads.findIndex(
        (person) => person.fileType === e.target.id
      );
      console.log(Index);
      uploads[Index].fileName = Name;
      uploads[Index].dataImage = reader.result;
      Images = uploads;
      uploadImages[Index].fileName = Name;

      console.log(uploadImages);
      console.log(Images);
    };
  }
  const update_documents = async () => {
    await fetch(`http://localhost:5000/update-image/${idd}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        stdupload: Images,
      }),
    });
  };
  function setDocuments() {
    localStorage.setItem("upload", JSON.stringify(uploadImages));
  }
  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5">
        <MDBCardBody>
          <MDBCardHeader style={{ textAlign: "center" }}>
            UPLOAD DOCUMENTS
          </MDBCardHeader>
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form onSubmit={update_documents}>
            <MDBRow>
              <MDBCol>
                <label>Type of Document :</label>
                <select
                  className="form-control select2"
                  name="result"
                  id="result"
                  required
                  aria-hidden="true"
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                >
                  <option>Please select</option>
                  {uploaded ? (
                    <>
                      {uploaded.map((item) => {
                        return (
                          <option key={item.fileType} value={item.fileType}>
                            {item.fileType}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>
              </MDBCol>
              <MDBCol>
                <label style={{ paddingBottom: "10px" }}>
                  Update Selected Document/Marksheet :
                </label>
                <input
                  id={type}
                  accept=".pdf"
                  type="file"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>

            <MDBRow>
              <MDBCol>
                <MDBBtn type="submit" onClick={setDocuments}>Update</MDBBtn>
              </MDBCol>
              <MDBCol>
                <Link to="/stddash">
                  <MDBBtn type="button">Back</MDBBtn>
                </Link>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default UPLOAD;
