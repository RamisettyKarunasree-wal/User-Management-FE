import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    email: "",
    userRoleId: "",
  });
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    userRoleId: "",
  });
  const [error, setError] = useState(null);

  const fetchUsers = async (page = 1, limit = 5) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/user`, {
        params: {
          page: page,
          limit: limit,
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage);
  }, [currentPage]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserForm({ ...newUserForm, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      editForm.userRoleId = Number(editForm.userRoleId);
      await axios.patch(`${baseUrl}/user/${editForm._id}`, editForm);
      fetchUsers();
      setShowEditModal(false);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const handleCreateSubmit = async () => {
    try {
      newUserForm.userRoleId = Number(newUserForm.userRoleId);
      const res = await axios.post(`${baseUrl}/user`, newUserForm);
      setError("");
      console.log(res.data);
      fetchUsers();
      setShowCreateModal(false);
      setNewUserForm({ name: "", email: "", userRoleId: "" });
    } catch (e) {
      setError(e.response.data.message[0]);
      console.log(e.response.data.message);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`${baseUrl}/users/${email}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm(user);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditForm({ name: "", emailId: "", phone_number: "" });
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewUserForm({ name: "", emailId: "", phone_number: "" });
  };
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-100 h-100 list-wrapper py-3 px-5 ">
        <p className="fs-3 fw-bold">Users</p>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-12 col-md-6 mb-2 mb-md-0">
              <div className="d-flex search-input-wrapper align-items-center">
                <span className="search-icon me-2">
                  <CiSearch />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={filter}
                  onChange={handleFilter}
                  className="w-100"
                />
              </div>
            </div>

            <div className="col-6 col-md-3 text-center">
              <div
                className="btn btn-primary"
                style={{ backgroundColor: "#9052ae", borderColor: "#9052ae" }}
                onClick={openCreateModal}
              >
                Add New User +
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {!loading ? (
            <div className="row d-flex justify-content-center">
              <Table striped bordered hover>
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
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.userRoleId === 1 ? "Admin" : "User"}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="m-1"
                          onClick={() => openEditModal(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="m-1"
                          onClick={() => handleDelete(user.emailId)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageCount={10}
                previousLabel="previous"
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="spinner-grow text-secondary loader" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={closeEditModal} centered>
          <Modal.Header closeButton className="custom-modal-header">
            Edit User
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formRole" className="my-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Control
                  as="select"
                  name="userRoleId"
                  value={editForm.userRoleId}
                  onChange={handleEditChange}
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </Form.Control>
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Create Modal */}
        <Modal show={showCreateModal} onHide={closeCreateModal} centered>
          <Modal.Header closeButton className="custom-modal-header">
            Create User
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={newUserForm.name}
                  onChange={handleNewUserChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={newUserForm.email}
                  onChange={handleNewUserChange}
                />
              </Form.Group>
              <Form.Group controlId="formRole" className="my-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Control
                  as="select"
                  name="userRoleId"
                  value={newUserForm.userRoleId}
                  onChange={handleNewUserChange}
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </Form.Control>
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeCreateModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleCreateSubmit}>
              Create User
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;
