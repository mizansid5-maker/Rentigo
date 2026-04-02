import { useEffect, useState } from "react";
import { api } from "../services/api";

function AdminDashboard() {

  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({
    vehicles: 0,
    users: 0
  });

  const loadVehicles = () => {
    api.get("/vehicles").then(res => {
      setVehicles(res.data);
      setStats(prev => ({
        ...prev,
        vehicles: res.data.length
      }));
    });
  };

  const loadUsers = () => {
    api.get("/admin/stats")
      .then(res => {
        setStats(prev => ({
          ...prev,
          users: res.data.registeredUsers
        }));
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadVehicles();
    loadUsers();
  }, []);

  // DELETE VEHICLE
  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    await api.delete(`/vehicles/${id}`);
    loadVehicles();
  };

  // TOGGLE AVAILABILITY
  const toggleAvailability = async (id) => {
    await api.put(`/vehicles/${id}/availability`);
    loadVehicles();
  };

  return (

    <div className="admin-container">

      <h2>Admin Dashboard</h2>

      {/* STATS CARDS */}
      <div className="admin-stats">

        <div className="stat-card">
          <h3>{stats.users}</h3>
          <p>Registered Users</p>
        </div>

        <div className="stat-card">
          <h3>{stats.vehicles}</h3>
          <p>Total Vehicles</p>
        </div>

      </div>


      {/* VEHICLE TABLE */}
      <table className="admin-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map(v => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.type}</td>
              <td>
                {v.availability ? "Available" : "Unavailable"}
              </td>

              <td>

                <button
                  className="toggle-btn"
                  onClick={() => toggleAvailability(v._id)}
                >
                  Toggle
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteVehicle(v._id)}
                >
                  Delete
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

