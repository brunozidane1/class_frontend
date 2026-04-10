import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/api/departments";

export default function DepartmentTablePage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_BASE_URL);
      setRows(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const onDelete = async (id) => {
    const confirmed = window.confirm("Delete this department?");
    if (!confirmed) {
      return;
    }

    try {
      setActionLoadingId(id);
      setError("");
      await axios.delete(`${API_BASE_URL}/${id}`);
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete department");
    } finally {
      setActionLoadingId(null);
    }
  };

  const onUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <section className="card">
      <div className="header-row">
        <div>
          <h1>Department Table</h1>
          <p className="subtitle">Live data from your backend API.</p>
        </div>
        <button type="button" onClick={loadDepartments} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && <p className="alert error">{error}</p>}
      {!loading && rows.length === 0 && !error && <p className="subtitle">No departments found.</p>}

      {rows.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Manager</th>
                <th>Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.salary}</td>
                  <td>{row.manager}</td>
                  <td>{row.dep_code}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => onUpdate(row.id)}
                        disabled={actionLoadingId === row.id}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => onDelete(row.id)}
                        disabled={actionLoadingId === row.id}
                      >
                        {actionLoadingId === row.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}