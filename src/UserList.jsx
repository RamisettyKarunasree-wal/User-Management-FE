import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import EditUserModal from "./EditUserModal";
import UserTable from "./UserTable";
import "./UserList.css";

const UserList = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsers = async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching
      const response = await axios.get(`${baseUrl}/user`, {
        withCredentials: true,
        params: { page, limit: usersPerPage, name: searchTerm },
      });
      setUsers(response.data.users);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, filter);
  }, [currentPage, filter]);

  const handleFilter = (e) => setFilter(e.target.value);
  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditSubmit = async () => {
    try {
      await axios.patch(
        `${baseUrl}/user/${editForm._id}`,
        { ...editForm },
        { withCredentials: true }
      );
      fetchUsers(currentPage, filter);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    const sure = window.confirm("Are you sure, you want to delete?");
    if (sure) {
      try {
        await axios.delete(`${baseUrl}/user/${id}`, { withCredentials: true });
        fetchUsers(currentPage, filter);
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Failed to delete user. Please try again later.");
      }
    }
  };

  const openEditModal = (user) => {
    delete user.password;
    setEditForm(user);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const handlePageClick = (data) => setCurrentPage(data.selected + 1);

  const pageCount = Math.ceil(totalCount / usersPerPage);

  return (
    <>
      <div className="userlist-container d-flex align-items-center justify-content-center h-100">
        <div className="userlist-card d-flex flex-column">
          <div className="userlist-header d-flex justify-content-between align-items-center">
            <h2 className="userlist-title">User Management</h2>
          </div>
          <SearchBar filter={filter} handleFilter={handleFilter} />
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Error Message */}
          {!loading ? (
            <>
              <UserTable
                users={users}
                handleEdit={openEditModal}
                handleDelete={handleDelete}
              />
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
              />
            </>
          ) : (
            <div className="loading-text">Loading...</div>
          )}
          <EditUserModal
            show={showEditModal}
            editForm={editForm}
            handleEditChange={handleEditChange}
            handleClose={closeEditModal}
            handleSubmit={handleEditSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
