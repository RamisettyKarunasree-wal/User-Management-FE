import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditUserModal = ({
  show,
  editForm,
  handleEditChange,
  handleClose,
  handleSubmit,
}) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton className="custom-modal-header">
      Edit User
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formFirstName" className="my-3">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstName"
            name="firstName"
            value={editForm.firstName}
            onChange={handleEditChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName" className="my-3">
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
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="success" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EditUserModal;
