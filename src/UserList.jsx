import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    userRoleId: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUsers = async (page = 1, limit = 5) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/user`, {
        withCredentials: true,
        params: {
          page: page,
          limit: limit,
        },
      });
      setIsAuthenticated(true);
      setUsers(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error.status);
      setLoading(false);
      if (error.status === 401) {
        setIsAuthenticated(false);
      }
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

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      });
      console.log(response);
      window.location.pathname = "/login";
    } catch (error) {
      console.error("Error Logging Out:", error);
    }
  };
  const handleEditSubmit = async () => {
    try {
      await axios.patch(
        `${baseUrl}/user/${editForm._id}`,
        { ...editForm },
        { withCredentials: true }
      );
      fetchUsers();
      setShowEditModal(false);
    } catch (e) {
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
    setEditForm(user);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditForm({ name: "", emailId: "", phone_number: "" });
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  return (
    <>
      {isAuthenticated ? (
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
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#9052ae",
                      borderColor: "#9052ae",
                    }}
                    onClick={handleLogout}
                  >
                    logout
                  </button>
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
                          <td>
                            {user.firstName} {user.lastName}
                          </td>
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
                  <div
                    className="spinner-grow text-secondary loader"
                    role="status"
                  >
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
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter firstName"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formName" className="my-3">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter lastName"
                      name="lastName"
                      value={editForm.lastName}
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
          </div>
        </div>
      ) : (
        <div>
          Authentication Failed. Please login Again ----
          <div>
            <button
              className="login-btn p-2 mx-auto w-100"
              onClick={() => (window.location.pathname = "/login")}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
