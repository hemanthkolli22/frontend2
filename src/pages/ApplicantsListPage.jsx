import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchJobApplicantsAPI,
  updateApplicationStatusAPI,
} from "../api/axiosAPI";

export default function ApplicantsListPage() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const { role } = useSelector((state) => state.auth);

  // 🔹 Fetch applicants for this job
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await fetchJobApplicantsAPI(jobId);
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error("❌ Error fetching applicants:", err);
        toast.error("Failed to load applicants");
      }
    };
    fetchApplicants();
  }, [jobId]);

  // 🔹 Accept / Reject applicant
  const handleUpdateStatus = async (id, status) => {
    if (!["recruiter", "admin"].includes(role)) return;

    try {
      const res = await updateApplicationStatusAPI(id, status);

      // ✅ Update status in local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: res.data.application.status } : app
        )
      );

      toast.success(`Application ${status}`);
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error(err.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Applicants</h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applicants yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            className="border p-4 rounded mb-2 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>{app.applicant?.name}</strong>
              </p>
              <p>{app.applicant?.email}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold capitalize ${
                    app.status === "accepted"
                      ? "text-green-600"
                      : app.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status}
                </span>
              </p>
            </div>

            {/* ✅ Recruiter/Admin actions */}
            {["recruiter", "admin"].includes(role) && (
              <div className="flex gap-2">
                {app.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(app._id, "accepted")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
                {app.resumeUrl && (
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Resume
                  </a>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
