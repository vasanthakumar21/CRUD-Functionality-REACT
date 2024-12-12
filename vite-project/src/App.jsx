import React from "react";
import { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

const App = () => {
  const [users, Setuser] = useState([]);

  const [edit, Setedit] = useState("add");

//creating userInfo
  const [userInfo, SetUserInfo] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  //getting a value from user
  const handldeClick = (e) => {
    const { name, value } = e.target;
    SetUserInfo((cur) => {
      return {
        ...cur,
        [name]: value,
      };
    });
  };

  //adding data into the datatable fisrt usestate
  const addData = () => {
    Setuser((cur) => [...cur, userInfo]);
    SetUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
  };
  //delete function
  const deleteData = (id) => {
    console.log("clicked");
    Setuser((cur) => {
      return cur.filter((uu) => {
        return uu.id !== id;
      });
    });
  };
// edit function
  const editData = (user) => {
    SetUserInfo(user);
    Setedit("edit");
  };
// cancel function
  const cancel = () => {
    SetUserInfo({
      name: "",
      age: "",
      email: "",
      phone: "",
    });

    Setedit("add");
  };

  //update
  const update = () => {
    Setuser((cur) => {
      return cur.map((user) => {
        if (user.id == userInfo.id) {
          return userInfo;
        }
        return user;
      });
    });
    cancel();
  };

  return (
    <div className="Container">
      <div className="form">
        <input
          type="text"
          placeholder="Enter your name"
          value={userInfo.name}
          name="name"
          onChange={handldeClick}
        />
        <br />
        <input
          type="number"
          placeholder="Enter your age"
          value={userInfo.age}
          name="age"
          onChange={handldeClick}
        />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={userInfo.email}
          name="email"
          onChange={handldeClick}
        />
        <br />
        <input
          type="number"
          placeholder="Enter your phone"
          value={userInfo.phone}
          name="phone"
          onChange={handldeClick}
        />
        <br />
        {edit === "add" ? (
          <button onClick={addData}> add</button>
        ) : (
          <div>
            <button onClick={update}> update</button>
            <button className="can" onClick={cancel}>
              {" "}
              cancel
            </button>
          </div>
        )}
      </div>
      <div className="dataTable ">
        <table>
          <thead>
            <tr>
              <th> Name</th>
              <th> Age</th>
              <th> Email</th>
              <th> Phone</th>
              <th> actions </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => editData(user)}> edit</button>
                    <button onClick={() => deleteData(user.id)}> delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
