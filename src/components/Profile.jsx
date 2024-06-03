import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/profile.css'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem('email');
  const id = localStorage.getItem('id');
  const [firstname, setfirstname] = useState('')
  useEffect(() => {
      axios.get(`http://localhost:8080/users/singleuserlist/${id}`)
        .then((response) => {
          setUserData(response.data.message);
        })
  }, []);

  return (
    <div id='profile' >
      {email ? (
        <>
          {userData && (
            <>
            <div>
              {/* <strong>User Data:</strong> {JSON.stringify(userData)} */}
                   firstname: {userData.firstname}          
            </div>
            <div> lastname: {userData.lastname}   </div>
            <div> {userData.phoneno}   </div>
            <div> email: {userData.email}   </div>
            <div> password: {userData.password}   </div>
            </>
          )}
        </>
      ) : (
        <h1>Please Login</h1>
      )}
    </div>
  );
};

export default Profile;
