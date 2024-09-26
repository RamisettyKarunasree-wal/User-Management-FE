import React from "react";
import { Table } from "react-bootstrap";
import "./UserTable.css"; // Import the updated CSS

const UserTable = ({ users, handleEdit, handleDelete }) => (
  <Table striped bordered hover className="user-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>{user.email}</td>
          <td>{user.userRoleId === 1 ? "Admin" : "User"}</td>
          <td>
            <button className="edit-btn m-1" onClick={() => handleEdit(user)}>
              Edit
            </button>
            <button
              className="delete-btn m-1"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default UserTable;
