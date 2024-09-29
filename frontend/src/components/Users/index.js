import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const getUserList = async () => {
    //https://smoke-trees-server.vercel.app/users
    //http://localhost:5000/users
    const apiUrl = "https://smoke-trees-server.vercel.app/users";
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    setUserList(data);
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <>
    <Navbar/>
    <div className="user-page-container">
      <h1 className="list-heading">Users</h1>
      <ul className="user-lists">
        {userList.map((each) => (
          <li className="list-item" key={each.id}>
              <div className="user-card">
              <p className="user-name">{each.name}</p>
              <p className="user-address">{each.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};
export default Users;
