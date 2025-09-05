import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { adminUsersAPI, adminJobsAPI } from "../API's.js";

function AdminDashboard() {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchJobs();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(adminUsersAPI, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(res.data.users);
  };

  const fetchJobs = async () => {
    const res = await axios.get(adminJobsAPI, { headers: { Authorization: `Bearer ${token}` } });
    setJobs(res.data.jobs);
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`${adminUsersAPI}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  const handleDeleteJob = async (id) => {
    await axios.delete(`${adminJobsAPI}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchJobs();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Users */}
      <h2 className="text-xl font-semibold mt-4">Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id} className="flex justify-between border p-2 my-2 rounded">
            {u.name} ({u.email}) - {u.role}
            <button onClick={() => handleDeleteUser(u._id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
          </li>
        ))}
      </ul>

      {/* Jobs */}
      <h2 className="text-xl font-semibold mt-6">Jobs</h2>
      <ul>
        {jobs.map((j) => (
          <li key={j._id} className="flex justify-between border p-2 my-2 rounded">
            {j.title} - {j.company}
            <button onClick={() => handleDeleteJob(j._id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
