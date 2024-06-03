import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Userlist = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    allUserList();
  }, []); 

  const allUserList = () => {
    axios.get('http://localhost:8080/users/userlist').then((response) => {
      setUserData(response.data.message);
    });
  };

  const deleteHandler = (id) => {
    axios.delete('http://localhost:8080/users/deleteuser/' + id).then((response) => {
      allUserList();
    });
  };

  let loggedInUserId = localStorage.getItem('id');

  return (
    <>
      <table border={1} align="center" width={1000}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <input
                  type="button"
                  value="delete"
                  onClick={() => deleteHandler(user._id)}
                />
              </td>
              <td>
                {user._id == loggedInUserId && (
                  <input
                    type="button"
                    value="update"
                    onClick={() => navigate('/edit/' + user._id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Userlist;
