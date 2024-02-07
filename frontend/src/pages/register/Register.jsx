import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username*</label>
          <input
            name="username"
            type="text"
            placeholder="john_doe_12"
            onChange={handleChange}
            required
          />
          <label htmlFor="">Full Name*</label>
          <input
            name="username"
            type="text"
            placeholder="John Doe"
            onChange={handleChange}
            required
          />
          <label htmlFor="">Email*</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.xyz"
            onChange={handleChange}
            required
          />
          <label htmlFor="">Password*</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number*</label>
          <input
            name="phone"
            type="text"
            placeholder="+91 12345 67890"
            onChange={handleChange}
            required
          />
          <label htmlFor="">Profile Picture*</label>
          <div id="custom-file-upload">
            <span id="upload_button">
              <CloudUploadIcon /> Custom Upload
            </span>
            <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <label htmlFor="">Country*</label>
          <input
            name="country"
            type="text"
            placeholder="India"
            onChange={handleChange}
            required
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
