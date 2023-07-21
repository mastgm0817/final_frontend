import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post("http://localhost:8080/api/users", newUser);
      getUsers();
      setNewUser([]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (uid) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${uid}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateUser = async (uid, updatedUser) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${uid}`, updatedUser);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);

  return (
    <div>
      <h1>User List</h1>
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Picture"
          value={newUser.picture}
          onChange={(e) => setNewUser({ ...newUser, picture: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lover"
          value={newUser.lover}
          onChange={(e) => setNewUser({ ...newUser, lover: e.target.value })}
        />
        <button onClick={createUser}>Add</button>
      </div>
      <div>
        <h2>User List</h2>
        {users.map((user) => (
          <div key={user.uid}>
            <div>
              <strong>ID:</strong> {user.uid}
            </div>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Picture:</strong> {user.picture}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
            <div>
              <strong>Lover:</strong> {user.lover}
            </div>
            <div>
              <button onClick={() => deleteUser(user.uid)}>Delete</button>
              <button
                onClick={() =>
                  updateUser(user.uid, {
                    name: "Updated Name",
                    email: "Updated Email",
                    picture: "Updated Picture",
                    role: "Updated Role",
                    lover: "Updated Lover"
                  })
                }
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
