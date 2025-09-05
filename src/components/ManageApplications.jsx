// src/components/ManageApplications.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosAPI"; // Updated API instance
import { toast } from "react-toastify";

export default function ManageApplications({ jobId }) {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(`/applications/job/${jobId}`);
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err.response || err);
      toast.error("Failed to fetch applications");
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      await axios.put(`/applications/${appId}/status`, { status });
      toast.success("Application status updated");
      fetchApplications(); // Refresh list
    } catch (err) {
      console.error("Error updating status:", err.response || err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Applications</h2>
      {applications.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Resume</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="p-2 border">{app.applicant?.name}</td>
                <td className="p-2 border">{app.applicant?.email}</td>
                <td className="p-2 border">
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
                <td className="p-2 border">{app.status || "pending"}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => updateStatus(app._id, "accepted")}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No applications found</p>
      )}
    </div>
  );
}
