// frontend/src/pages/AdminApplications.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("https://backend2-fid2.onrender.com/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(data.applications || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applications");
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Job Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Applicant</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Job Title</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="p-2 border">{app.applicant?.name}</td>
                <td className="p-2 border">{app.applicant?.email}</td>
                <td className="p-2 border">{app.job?.title}</td>
                <td className="p-2 border">{app.job?.location}</td>
                <td className="p-2 border">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
