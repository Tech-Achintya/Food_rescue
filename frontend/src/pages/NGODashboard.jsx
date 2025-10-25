import Status from "../components/Status";
import NGOView from "../components/NGOView";

export default function NGODashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <div>Hello, {user.name} (NGO)</div>
        <button onClick={onLogout} className="p-2 bg-red-600 text-white rounded">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <Status />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <NGOView user={user} />
        </div>
      </div>
    </div>
  );
}
