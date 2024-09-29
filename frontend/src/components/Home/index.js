import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import Navbar from "../Navbar";
import "./index.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    if (userName === "" || address === "") {
      setShowErrMsg(true);
    } else {
      const userDetails = {
        userId: uuidv4(),
        name: userName,
        address: address,
      };
      setUserName("");
      setAddress("");
      setShowErrMsg(false);
      //https://smoke-trees-server.vercel.app/register
      //http://localhost:5000/register
      const apiUrl = "https://smoke-trees-server.vercel.app/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, options);
      //eslint-disable-next-line
      const data = await response.json();
      if (response.ok) {
        console.log("User Registered Successfully");
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/users");
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="bg-container">
      <Navbar />
      <div className="body-container">
        <div className="left-section">
          <h1 className="heading">
            Building <br />
            <span className="heading-span">Products</span>
          </h1>
          <p className="description">Building what you ideate</p>
        </div>
        <div className="right-section">
          <h1 className="form-heading">User Registration</h1>
          <form onSubmit={submitForm} className="my-form">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="input-box"
              value={userName}
              placeholder="Enter your name"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className="input-label" htmlFor="useraddress">
              Address
            </label>
            <input
              type="text"
              className="input-box"
              value={address}
              placeholder="Enter your address"
              id="useraddress"
              onChange={(e) => setAddress(e.target.value)}
            />
            {showErrMsg && <p className="error-msg">*Please fill the mandatory fields.</p>}
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="Registration Successful Modal"
            className="registration-modal"
            ariaHideApp={false}
            style={customStyles}
          >
            <div className="modal-container">
              <button onClick={closeModal} className="close-btn">
                <CgClose size={15} />
              </button>
              <h2 className="slot-text">Your Registration is Successful!</h2>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Home;
