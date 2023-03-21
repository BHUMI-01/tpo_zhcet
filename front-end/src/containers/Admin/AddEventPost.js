import React from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBInput,
    MDBCardBody,
    MDBCol,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Country, State, City } from "country-state-city";

const AddJob = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setNumber] = useState("");
    const [date, setEventDate] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setCode] = useState("");
    const [supportiveDocs, setsupportiveDocs] = useState("");

    useEffect(() => {
        const authorize = localStorage.getItem("token");
        if (!authorize) {
            navigate("/");
        }
    }, []);

    const set_Job = async () => {
        const profi = JSON.stringify({
            title,
            date,
            location: {
                address,
                city,
                state,
                country,
                zipCode,
            },
            organizer: {
                name,
                email,
                phone,
            },
            supportiveDocs,
            description,
        });
        localStorage.setItem("jobs", profi);
    };

    const covertToBase64 = (e) => {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setsupportiveDocs(reader.result);
        };
    };

    const uploadJob = async () => {
        await fetch("http://localhost:5000/add-event-post", {
            method: "post",
            body: JSON.stringify({
                title,
                date,
                location: {
                    address,
                    city,
                    state,
                    country,
                    zipCode,
                },
                organizer: {
                    name,
                    email,
                    phone,
                },
                supportiveDocs,
                description,
            }),
            headers: {
                "Content-Type": "application/json",
                authorization: JSON.parse(localStorage.getItem("token")),
            },
        });
    };

    const CountryVar = Country.getAllCountries();
    const StateVar = State.getStatesOfCountry(country);
    const CityVar = City.getCitiesOfState(country, state);

    return (
        <MDBContainer fluid>
            <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}
                        >
                            ADD JOB OPPORTUNITY
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <form onSubmit={uploadJob}>
                        <MDBRow>
                            <MDBCol>
                                <label>Event Title: </label>
                                <MDBInput
                                    id="title"
                                    required
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></MDBInput>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ height: "20px" }}></MDBRow>


                        <MDBRow>
                            <MDBCol>
                                <label>Organizer Name: </label>
                                <MDBInput
                                    id="title"
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></MDBInput>
                            </MDBCol>
                            <MDBCol>
                                <label>Organizer Email: </label>
                                <MDBInput
                                    id="title"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></MDBInput>
                            </MDBCol>
                            <MDBCol>
                                <label>Organizer Number: </label>
                                <MDBInput
                                    id="title"
                                    required
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setNumber(e.target.value)}
                                ></MDBInput>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ height: "20px" }}></MDBRow>


                        <MDBRow>
                            <MDBCol>
                                <label>Event Date: </label>
                                <MDBInput
                                    id="eventdate"
                                    required
                                    type="date"
                                    value={date}
                                    onChange={(e) => setEventDate(e.target.value)}
                                ></MDBInput>
                            </MDBCol>
                            <MDBCol>
                                <label>Description: </label>
                                <MDBInput
                                    id="description"
                                    required
                                    type="text"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                ></MDBInput>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol>
                                <label className="required" htmlFor="country_id">
                                    Country
                                </label>
                                <select
                                    className="form-control select2"
                                    name="country_id"
                                    id="country_id"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    aria-hidden="true"
                                >
                                    <option>--Select Country--</option>

                                    {CountryVar.map((item) => {
                                        return (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </MDBCol>
                            <MDBCol>
                                <label htmlFor="province_id">Province</label>
                                <select
                                    className="form-control"
                                    name="province_id"
                                    id="province_id"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                >
                                    <option>--Select State--</option>

                                    {StateVar.map((item) => {
                                        return (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <label htmlFor="city_id">City:</label>
                                <select
                                    className="form-control"
                                    name="city_id"
                                    id="city_id"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option>--Select City--</option>

                                    {CityVar.map((item) => {
                                        return (
                                            <option key={item.latitude} value={item.name}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </MDBCol>
                            <MDBCol>
                                <label className="required" htmlFor="postal_code">
                                    Postal Code
                                </label>
                                <input
                                    id="postal_code"
                                    className="form-control"
                                    type="text"
                                    name="postal_code"
                                    value={zipCode}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>


                        <MDBRow style={{ height: "20px" }}></MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <label>Upload SupportiveDocs: </label>
                                <input
                                    id="supportivedoc"
                                    accept=".pdf, .jpg, .jpeg, .doc"
                                    type="file"
                                    onChange={covertToBase64}
                                ></input>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ height: "20px" }}></MDBRow>

                        <MDBRow style={{ height: "20px" }}></MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtn type="submit" onClick={set_Job}>
                                    Save
                                </MDBBtn>
                            </MDBCol>
                            <MDBCol>
                                <Link to="/admin/notification">
                                    <MDBBtn>Back</MDBBtn>
                                </Link>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default AddJob;
