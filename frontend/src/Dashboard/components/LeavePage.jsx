import React, { useState } from "react";
import axios from "axios";

export default function LeavePage() {
  const [formData, setFormData] = useState({
    date: "",
    applicantName: "",
    employeeId: "",
    designation: "",
    department: "",
    leaveDays: "",
    leaveFrom: "",
    leaveTo: "",
    station: "",
    contact: "",
    personInCharge: "",
    reportingTo: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/leaves/generate-form", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "LeaveApplicationForm.pdf";
      link.click();
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Check console for details.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Leave Application Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input name="applicantName" placeholder="Applicant Name" value={formData.applicantName} onChange={handleChange} required />
        <input name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} required />
        <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <input type="number" name="leaveDays" placeholder="No. of Leave Days" value={formData.leaveDays} onChange={handleChange} required />
        <input type="date" name="leaveFrom" value={formData.leaveFrom} onChange={handleChange} required />
        <input type="date" name="leaveTo" value={formData.leaveTo} onChange={handleChange} required />
        <input name="station" placeholder="Station" value={formData.station} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input name="personInCharge" placeholder="Person In Charge" value={formData.personInCharge} onChange={handleChange} required />
        <input name="reportingTo" placeholder="Reporting To" value={formData.reportingTo} onChange={handleChange} required />
        <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: "10px" }}>Generate PDF</button>
      </form>
    </div>
  );
}
