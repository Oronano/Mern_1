import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUserId(decodedToken.id);
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users");
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found!");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentUserId = decodedToken.id;
            if (currentUserId !== id) {
                alert("Can't delete another user");
                return;
            }

            await axios.delete(`http://localhost:8080/user`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { id },
            });
            fetchUsers();
            localStorage.removeItem("token");
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    const handleEdit = (user) => {
        setNewUsername(user.username);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found!");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/user`,
                { username: newUsername, currentPassword, newPassword },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setShowModal(false);
            fetchUsers();
            alert("User updated successfully!");
        } catch (error) {
            alert(`Error: ${error.response.data.error}`);
        }
    };

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <div>
                            {user.username}
                            {currentUserId === user._id && (
                                <>
                                    <button onClick={() => handleEdit(user)}>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
