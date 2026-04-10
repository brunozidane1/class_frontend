import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/api/departments";

export default function DepartmentUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    salary: "",
    manager: "",
    dep_code: "",
  });
  const [loadingDepartment, setLoadingDepartment] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        setLoadingDepartment(true);
        setError("");
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        const department = response.data || {};
        setForm({
          name: department.name ?? "",
          salary: department.salary ?? "",
          manager: department.manager ?? "",
          dep_code: department.dep_code ?? "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch department");
      } finally {
        setLoadingDepartment(false);
      }
    };

    loadDepartment();
  }, [id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      setSubmitting(true);
      await axios.put(`${API_BASE_URL}/${id}`, form);
      setMessage("Department updated successfully");

      setTimeout(() => {
        navigate("/table");
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update department");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card">
      <h1>Update Department</h1>
      <p className="subtitle">Edit an existing department record in MySQL.</p>

      {message ? <p className="alert success">{message}</p> : null}
      {error ? <p className="alert error">{error}</p> : null}
      {loadingDepartment ? <p className="subtitle">Loading department...</p> : null}

      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            disabled={loadingDepartment || submitting}
            required
          />
        </label>

        <label>
          Salary
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={onChange}
            disabled={loadingDepartment || submitting}
            min="0"
            required
          />
        </label>

        <label>
          Manager
          <input
            type="text"
            name="manager"
            value={form.manager}
            onChange={onChange}
            disabled={loadingDepartment || submitting}
            required
          />
        </label>

        <label>
          Department Code
          <input
            type="text"
            name="dep_code"
            value={form.dep_code}
            onChange={onChange}
            disabled={loadingDepartment || submitting}
            required
          />
        </label>

        <button type="submit" disabled={submitting || loadingDepartment}>
          {submitting ? "Saving..." : "Update Department"}
        </button>
      </form>
    </section>
  );
}
