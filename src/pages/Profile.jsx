import { useSelector } from "react-redux";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth?.user);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No profile data available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

      <div className="space-y-3">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> {user.role}</p>
        {user.phone && <p><span className="font-semibold">Phone:</span> {user.phone}</p>}
      </div>
    </div>
  );
}
