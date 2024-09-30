import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";

const Users = () => {
  const [userList, setUserList] = useState([]);

  const getUpdatedData = (data) => {
    const combinedData = data.reduce((result, item) => {
      const existingUser = result.find((user) => user.userId === item.userId);
      if (existingUser) {
        existingUser.address.push(item.address);
      } else {
        result.push({ ...item, address: item.address.split() });
      }
      return result;
    }, []);
    return combinedData;
  };

  const getUserList = async () => {
    //https://smoketreesassignment-7mqh.onrender.com/users
    //http://localhost:5000/users
    const apiUrl = "https://smoketreesassignment-7mqh.onrender.com/users";
    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl,options);
    const data = await response.json();
    const updatedData = getUpdatedData(data);
    //console.log(data);
    console.log(updatedData);
    setUserList(updatedData);
  };

  useEffect(() => {
    getUserList();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />
      <div className="user-page-container">
        <h1 className="list-heading">Users</h1>
        <ul className="user-lists">
          {userList.map((each) => (
            <li className="list-item" key={each.id}>
              <div className="user-card">
                <p className="user-name">{each.name}</p>
               
                <ul className="address-list">
                  {each.address.map((eachAddress, index) => (
                    <li className="address-item" key={index}>
                      <p className="user-address">{eachAddress}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Users;

 /* <p className="user-address">{each.address}</p> */
