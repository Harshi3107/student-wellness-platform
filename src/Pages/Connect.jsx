import React, { useState } from "react";
import "./Connect.css";

const Connect = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    concern: "",
  });

  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem("sessions")) || []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newSession = { ...formData, id: Date.now(), counselor: "Unassigned" };
    const updatedSessions = [...sessions, newSession];

    // Save to localStorage (frontend-only storage)
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
    setSessions(updatedSessions);

    alert("Your session has been booked successfully!");
    setFormData({ name: "", email: "", date: "", concern: "" });
  };

  return (
    <div className="connect-container">
      <h2>Book a Counseling Session</h2>
      <form onSubmit={handleSubmit} className="connect-form">
        <label>Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Date*</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Concern</label>
        <textarea
          name="concern"
          rows="3"
          placeholder="Share briefly what you'd like to discuss..."
          value={formData.concern}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Connect;
