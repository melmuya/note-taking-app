import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from './api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleCreateUser = async () => {
    const data = await createUser(newUser);
    setUsers((prevUsers) => [...prevUsers, data.user]);
    setNewUser({ name: '', email: '' });
  };

  const handleUpdateUser = async (userId, updatedUser) => {
    const data = await updateUser(userId, updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? data.user : user))
    );
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className='container'>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleUpdateUser(user.id, { name: 'Updated Name' })}>
              Update
            </button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      <h2>Create User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateUser();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;




