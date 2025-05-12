import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // ✅ This is your secured instance

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    // ✅ Use the secure axiosInstance here
    useEffect(() => {
        axiosInstance.get("/users/all")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Failed to fetch users", err));
    }, []);

    // ✅ Secure delete
    const deleteUser = (id) => {
        axiosInstance.delete(`/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(err => console.error("Delete failed", err));
    };

    // ✅ Secure role update
    const changeRole = (id, newRole) => {
        axiosInstance.patch(`/users/${id}`, { role: newRole })
            .then(() => {
                setUsers(users.map(user =>
                    user.id === id ? { ...user, role: newRole } : user
                ));
            })
            .catch(err => console.error("Role update failed", err));
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                <tr><th>Email</th><th>Role</th><th>Actions</th></tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                            <button onClick={() =>
                                changeRole(user.id, user.role === "USER" ? "ADMIN" : "USER")
                            }>
                                Toggle Role
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
