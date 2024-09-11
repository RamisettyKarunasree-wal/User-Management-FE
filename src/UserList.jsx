import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Card, Dropdown } from "react-bootstrap";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";

const UserList = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [users, setusers] = useState([]);
  const [filter, setFilter] = useState("");
  const [selecteduser, setSelecteduser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    email: "",
    userRoleId: "",
  });
  const [newuserForm, setNewuserForm] = useState({
    name: "",
    email: "",
    userRoleId: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/user`);
      setusers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleNewuserChange = (e) => {
    const { name, value } = e.target;
    setNewuserForm({ ...newuserForm, [name]: value });
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
  const [error, setError] = useState(null);
  const handleCreateSubmit = async () => {
    try {
      newuserForm.userRoleId = Number(newuserForm.userRoleId);
      const res = await axios.post(`${baseUrl}/user`, newuserForm);
      setError("");
      console.log(res.data);
      fetchUsers();
      setShowCreateModal(false);
      setNewuserForm({ name: "", email: "", userRoleId: "" });
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
    setSelecteduser(user);
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
    setNewuserForm({ name: "", emailId: "", phone_number: "" });
  };

  const filteredusers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-100 h-100 list-wrapper py-3 px-5 ">
        <p className="fs-3 fw-bold">users</p>
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
              {filteredusers.map((user) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <Card body className="m-2">
                    <div className="d-flex align-items-center justify-content-start mb-2">
                      <div className="initial">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="fw-bold ms-2">{user.name}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start mb-1">
                      <div className="me-2">
                        <MdEmail />
                      </div>
                      <div className="overflow-x-auto">{user.email}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start mb-1">
                      <div className="me-2">
                        <RiAdminFill />
                      </div>
                      <div>{user.userRoleId === 1 ? "Admin" : "User"}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center my-2">
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
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="spinner-grow text-secondary loader" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary loader" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary loader" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={closeEditModal} centered>
          <Modal.Header closeButton className="custom-modal-header">
            Edit user
          </Modal.Header>
          <div className="d-flex flex-column justify-content-center align-items-center editbox-header">
            <div className="editbox-letter mt-2">
              {editForm.name.charAt(0).toUpperCase()}
            </div>
            <div className="fw-bold mt-1">{editForm.name}</div>
          </div>
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
              <Form.Group controlId="formPhoneNumber" className="my-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Control
                  as="select"
                  name="userRoleId"
                  value={editForm.userRoleId}
                  onChange={handleEditChange}
                >
                  <option value="">Select Role</option>{" "}
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
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Create Modal */}
        <Modal show={showCreateModal} onHide={closeCreateModal}>
          <Modal.Header closeButton className="custom-modal-header">
            Add New User
          </Modal.Header>
          <div className="d-flex flex-column justify-content-center align-items-center editbox-header">
            <div className="editbox-letter my-2">
              <IoPersonAdd />
            </div>
          </div>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNewName" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={newuserForm.name}
                  onChange={handleNewuserChange}
                />
              </Form.Group>
              <Form.Group controlId="formNewEmail" className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={newuserForm.email}
                  onChange={handleNewuserChange}
                />
              </Form.Group>
              <Form.Group controlId="formPhoneNumber" className="my-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Control
                  as="select"
                  name="userRoleId"
                  value={newuserForm.userRoleId}
                  onChange={handleNewuserChange}
                >
                  <option value="">Select Role</option>{" "}
                  <option value="2">User</option>
                  <option value="1">Admin</option>
                </Form.Control>
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeCreateModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;
