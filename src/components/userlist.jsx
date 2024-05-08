import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Userlist = () => {
    const [userData,setUserData] = useState('')
    useEffect(() =>{
        allUserList()
    })
    const allUserList = () =>{
        axios.get('http://localhost:8080/users/userlist').then((response) =>{
            setUserData(response.data.message);
        })
    }
    const deleteHandler = (id) =>{
        axios.delete('http://localhost:8080/users/deleteuser/'+id).then((response) =>{
            allUserList()
        })
    }
  return (
    <>
      <table border={1} align='center' width={1000}>
        <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Action</th></tr>
        {userData && userData.map((users) => (
            <tr>
                <td>{users._id}</td>
                <td>{users.firstname}</td>
                <td>{users.lastname}</td>
                <td>{users.email}</td>
                <td><input type="button" value="delete" onClick={() =>{
                    deleteHandler(users._id)
                }} /></td>
                <td><input type="button" value="update" /></td>
            </tr>
        ))}
      </table>
    </>
  )
}

export default Userlist
