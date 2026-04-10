import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/api/departments";

export default function DepartmentFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    salary: "",
    manager: "",
    dep_code: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

      await axios.post(API_BASE_URL, form);
      setMessage("Department created successfully");
      setForm({ name: "", salary: "", manager: "", dep_code: "" });

      setTimeout(() => {
        navigate("/table");
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create department");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card">
      <h1>Add Department</h1>
      <p className="subtitle">Create a new department record in MySQL.</p>

      {message ? <p className="alert success">{message}</p> : null}
      {error ? <p className="alert error">{error}</p> : null}

      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
            required
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Department"}
        </button>
      </form>
    </section>
  );
}