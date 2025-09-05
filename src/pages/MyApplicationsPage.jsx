// src/pages/MyApplicationsPage.jsx
import { useEffect, useState } from "react";
import API from "../api/axiosAPI";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/my"); // ✅ matches backend route
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="p-6">Loading applications...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Applications</h2>

      {applications.length > 0 ? (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app._id} className="border p-4 rounded-lg shadow">
              <h3 className="font-semibold">{app.job?.title}</h3>
              <p>{app.job?.company}</p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-medium ${
                    app.status === "accepted"
                      ? "text-green-600"
                      : app.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status || "Pending"}
                </span>
              </p>
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm underline"
              >
                View Resume
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found</p>
      )}
    </div>
  );
}
