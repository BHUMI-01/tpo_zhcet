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
import { useNavigate } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function UPLOAD() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  var Images = [];
  var uploadImages = [];
  const [nextButton, setnextbutton] = useState(false);
  const navigate = useNavigate();
  const idd = JSON.parse(localStorage.getItem("student"))._id;
  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.id);
    reader.onload = () => {
      console.log(reader.result);
      var Name = `${e.target.files[0].name}`;
      var neww = Images.find((person) => person.fileType === e.target.id);
      if (neww) {
        const Index = Images.findIndex(
          (person) => person.fileType === e.target.id
        );
        console.log(Index);
        Images[Index].fileName = Name;
        Images[Index].dataImage = reader.result;
        uploadImages[Index].fileName = Name;
      }
      else {
        Images = Images.filter((person) => person.fileType !== e.target.id);
        uploadImages.push({
          fileType: e.target.id,
          fileName: Name,
        });
        Images.push({
          fileType: e.target.id,
          fileName: Name,
          dataImage: reader.result,
        });
      }

      console.log(Images);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function setDocuments() {
    localStorage.setItem("upload", JSON.stringify(uploadImages));
  }
  const NextButton = () => {
    navigate("/onetimeform/reviewform");
  };
  function uploadImage() {
    fetch("http://localhost:5000/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        studentId: idd,
        stdupload: Images,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (authorize) {
      const auth2 = localStorage.getItem("upload");
      if (!auth2) {
        setnextbutton(true);
      } else {
        setnextbutton(false);
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const auth = JSON.parse(localStorage.getItem("stdqualify"));

  const Mtech = auth.find(
    (person) => person.qualifyLevel === "Graduation(M.Tech)"
  );
  const Btech = auth.find(
    (person) => person.qualifyLevel === "Undergraduation(B.Tech)"
  );

  const authh = JSON.parse(localStorage.getItem("stdprofile")).disability;
  console.log(auth);
  console.log(authh);

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5">
        <MDBCardBody>
          <MDBCardHeader style={{ textAlign: "center" }}>
            UPLOAD DOCUMENTS
          </MDBCardHeader>
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form onSubmit={uploadImage}>
            <MDBRow>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload High School Marksheet :
                </label>
                <input
                  id="High School Marksheet"
                  accept=".pdf"
                  type="file"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload Intermediate Marksheet :
                </label>
                <input
                  id="Intermediate Marksheet"
                  type="file"
                  accept=".pdf"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload Diploma Marksheet :
                </label>
                <input
                  id="Diploma Marksheet"
                  type="file"
                  accept=".pdf"
                  onChange={covertToBase64}
                ></input>
              </MDBCol>
              <MDBCol></MDBCol>
            </MDBRow>


            {Btech ? (
              <>
                <MDBRow style={{ height: "30px" }}>
                  <MDBCol>For Undergraduate:</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 1st SEM B-tech Marksheet :
                    </label>
                    <input
                      id="1st SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 2nd SEM B-tech Marksheet :
                    </label>
                    <input
                      id="2nd SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 3rd SEM B-tech Marksheet :
                    </label>
                    <input
                      id="3rd SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 4th SEM B-tech Marksheet :
                    </label>
                    <input
                      id="4th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 5th SEM B-tech Marksheet :
                    </label>
                    <input
                      id="5th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 6th SEM B-tech Marksheet :
                    </label>
                    <input
                      id="6th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                    ></input>
                  </MDBCol>
                </MDBRow>
              </>
            ) : null}
            {Mtech ? (
              <>
                <MDBRow style={{ height: "30px" }}>
                  <MDBCol>For PostGraduate:</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload Btech-Degree :
                    </label>
                    <input
                      id="Btech-Degree"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                  </MDBCol>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload Final Btech-Marksheet :
                    </label>
                    <input
                      id="Final Btech-Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ height: "20px" }}></MDBRow>
                <MDBRow>
                  <MDBRow style={{ height: "30px" }}>
                    <MDBCol>M.Tech Marksheets</MDBCol>
                  </MDBRow>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 1st SEM M-tech Marksheet :
                    </label>
                    <input
                      id="1st SEM M-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 2nd SEM M-tech Marksheet :
                    </label>
                    <input
                      id="2nd SEM M-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 3rd SEM M-tech Marksheet :
                    </label>
                    <input
                      id="3rd SEM M-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                    ></input>
                  </MDBCol>
                </MDBRow>
              </>
            ) : null}

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <hr />
            <MDBRow>
              {" "}
              {authh === "Yes" ? (
                <>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload Disability Certificate :
                    </label>
                    <input
                      id="Disability Certificate"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                  </MDBCol>
                </>
              ) : null}{" "}
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload Internship Certificate :
                </label>
                <input
                  id="Internship Certificate"
                  type="file"
                  accept=".pdf"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "40px" }}></MDBRow>
          <MDBRow>
            <MDBCol>
              <MDBBtn type="submit" onClick={setDocuments}>
                Save
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                type="button"
                onClick={() => {
                  NextButton();
                }}
                disabled={nextButton}
              >
                Next
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          </form>
          
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default UPLOAD;
