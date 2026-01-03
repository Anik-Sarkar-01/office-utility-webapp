// LeavePage.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Spin } from "antd";
import userContext from "../../context/userContext";
import "./LeavePage.css";

export default function LeavePage() {
  const auth = useContext(userContext);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    applicantName: "",
    employeeId: "",
    designation: "",
    department: "",
    leaveDays: "",
    leaveFrom: "",
    leaveTo: "",
    halfDay: "Not Required",
    halfDayType: "",
    leaveType: "",
    availableCasual: "",
    availableSick: "",
    availableAnnual: "",
    station: "",
    contact: "",
    personInCharge: "",
    reportingTo: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);

  // Fetch logged-in user data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${auth.userId}`);
        const user = response.data.user;
        setUserData(user);
        
        // Auto-fill form fields with user data
        setFormData(prev => ({
          ...prev,
          applicantName: user.name || "",
          employeeId: user._id || "",
          designation: user.position || "",
          contact: user.phone || "",
          // Set today's date as default
          date: new Date().toISOString().split('T')[0]
        }));
        
        setFetchingUser(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFetchingUser(false);
      }
    };

    if (auth.userId) {
      getUserData();
    }
  }, [auth.userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/leaves/generate-form", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `Leave_Application_${formData.applicantName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  // Show loading spinner while fetching user data
  if (fetchingUser) {
    return <Spin fullscreen />;
  }

  return (
    <div className="leave-page-container">
      <div className="leave-page-card">
        {/* Close Button */}
        <button 
          type="button"
          className="close-button"
          onClick={() => window.history.back()}
        >
          <X size={24} />
        </button>

        {/* Header Illustration */}
        <div className="illustration-container">
          <svg width="200" height="80" viewBox="0 0 200 80" className="cityscape-svg">
            {/* Sun */}
            <circle cx="170" cy="12" r="8" fill="currentColor" opacity="0.5" />
            
            {/* Buildings */}
            <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5">
              {/* Building 1 */}
              <rect x="10" y="45" width="22" height="30" rx="1" />
              <line x1="13" y1="49" x2="29" y2="49" />
              <line x1="13" y1="55" x2="29" y2="55" />
              <line x1="13" y1="61" x2="29" y2="61" />
              <line x1="13" y1="67" x2="29" y2="67" />
              
              {/* Building 2 - Tall */}
              <rect x="36" y="25" width="18" height="50" rx="1" />
              <line x1="39" y1="29" x2="51" y2="29" />
              <line x1="39" y1="35" x2="51" y2="35" />
              <line x1="39" y1="41" x2="51" y2="41" />
              <line x1="39" y1="47" x2="51" y2="47" />
              <line x1="39" y1="53" x2="51" y2="53" />
              <line x1="39" y1="59" x2="51" y2="59" />
              <line x1="39" y1="65" x2="51" y2="65" />
              <line x1="39" y1="71" x2="51" y2="71" />
              
              {/* Building 3 - Tallest */}
              <rect x="58" y="15" width="26" height="60" rx="1" />
              <line x1="61" y1="19" x2="81" y2="19" />
              <line x1="61" y1="25" x2="81" y2="25" />
              <line x1="61" y1="31" x2="81" y2="31" />
              <line x1="61" y1="37" x2="81" y2="37" />
              <line x1="61" y1="43" x2="81" y2="43" />
              <line x1="61" y1="49" x2="81" y2="49" />
              <line x1="61" y1="55" x2="81" y2="55" />
              <line x1="61" y1="61" x2="81" y2="61" />
              <line x1="61" y1="67" x2="81" y2="67" />
              <line x1="61" y1="73" x2="81" y2="73" />
              
              {/* Building 4 */}
              <rect x="88" y="38" width="20" height="37" rx="1" />
              <line x1="91" y1="42" x2="105" y2="42" />
              <line x1="91" y1="48" x2="105" y2="48" />
              <line x1="91" y1="54" x2="105" y2="54" />
              <line x1="91" y1="60" x2="105" y2="60" />
              <line x1="91" y1="66" x2="105" y2="66" />
              <line x1="91" y1="72" x2="105" y2="72" />
              
              {/* Building 5 - Tall */}
              <rect x="112" y="22" width="24" height="53" rx="1" />
              <line x1="115" y1="26" x2="133" y2="26" />
              <line x1="115" y1="32" x2="133" y2="32" />
              <line x1="115" y1="38" x2="133" y2="38" />
              <line x1="115" y1="44" x2="133" y2="44" />
              <line x1="115" y1="50" x2="133" y2="50" />
              <line x1="115" y1="56" x2="133" y2="56" />
              <line x1="115" y1="62" x2="133" y2="62" />
              <line x1="115" y1="68" x2="133" y2="68" />
              <line x1="115" y1="74" x2="133" y2="74" />
              
              {/* Building 6 */}
              <rect x="140" y="48" width="20" height="27" rx="1" />
              <line x1="143" y1="52" x2="157" y2="52" />
              <line x1="143" y1="58" x2="157" y2="58" />
              <line x1="143" y1="64" x2="157" y2="64" />
              <line x1="143" y1="70" x2="157" y2="70" />
              
              {/* Building 7 */}
              <rect x="164" y="42" width="18" height="33" rx="1" />
              <line x1="167" y1="46" x2="179" y2="46" />
              <line x1="167" y1="52" x2="179" y2="52" />
              <line x1="167" y1="58" x2="179" y2="58" />
              <line x1="167" y1="64" x2="179" y2="64" />
              <line x1="167" y1="70" x2="179" y2="70" />
            </g>
            
            {/* Ground line */}
            <line x1="5" y1="75" x2="195" y2="75" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="leave-form">
          {/* Row 1: Application Date */}
          <div className="form-row-one">
            <div className="input-group">
              <label className="input-label">Application Date</label>
              <input
                type="date"
                name="date"
                value={formData.date || today}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Row 2: Name & Employee ID */}
          <div className="form-row-two">
            <div className="input-group">
              <label className="input-label">Applicant Name</label>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                required
                className="form-input"
                readOnly
              />
            </div>
            <div className="input-group">
              <label className="input-label">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="form-input"
                readOnly
              />
            </div>
          </div>

          {/* Row 3: Designation & Department */}
          <div className="form-row-two">
            <div className="input-group">
              <label className="input-label">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="form-input"
                readOnly
              />
            </div>
            <div className="input-group">
              <label className="input-label">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Section: Details of Requesting Leave */}
          <div className="section-divider">
            <h3 className="section-title">Details of Requesting Leave</h3>
          </div>

          {/* Row 4: Leave Days & Duration */}
          <div className="form-row-three">
            <div className="input-group">
              <label className="input-label">No. of Day(s)</label>
              <input
                type="number"
                name="leaveDays"
                value={formData.leaveDays}
                onChange={handleChange}
                required
                min="0.5"
                step="0.5"
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">From</label>
              <input
                type="date"
                name="leaveFrom"
                value={formData.leaveFrom}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">To</label>
              <input
                type="date"
                name="leaveTo"
                value={formData.leaveTo}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Row 5: Half Day Options */}
          <div className="form-row-halfday">
            <div className="input-group">
              <label className="input-label">If Half Day</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="halfDay"
                    value="Not Required"
                    checked={formData.halfDay === "Not Required"}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span>Not Required</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="halfDay"
                    value="Morning"
                    checked={formData.halfDay === "Morning"}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span>Morning</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="halfDay"
                    value="Evening"
                    checked={formData.halfDay === "Evening"}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span>Evening</span>
                </label>
              </div>
            </div>
          </div>

          {/* Row 6: Leave Type */}
          <div className="form-row-one">
            <div className="input-group">
              <label className="input-label">Leave Type</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Casual"
                    checked={formData.leaveType === "Casual"}
                    onChange={handleChange}
                    required
                    className="radio-input"
                  />
                  <span>Casual</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Sick"
                    checked={formData.leaveType === "Sick"}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span>Sick</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Annual"
                    checked={formData.leaveType === "Annual"}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span>Annual</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Replacement"
                    checked={formData.leaveType === "Replacement"}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span>Replacement</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Without Pay"
                    checked={formData.leaveType === "Without Pay"}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span>Without Pay</span>
                </label>
              </div>
            </div>
          </div>

          {/* Row 7: Available Leave */}
          <div className="form-row-three">
            <div className="input-group">
              <label className="input-label">Available Casual Leave</label>
              <input
                type="number"
                name="availableCasual"
                value={formData.availableCasual}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="form-input"
                placeholder="days"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Available Sick Leave</label>
              <input
                type="number"
                name="availableSick"
                value={formData.availableSick}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="form-input"
                placeholder="days"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Available Annual Leave</label>
              <input
                type="number"
                name="availableAnnual"
                value={formData.availableAnnual}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="form-input"
                placeholder="days"
              />
            </div>
          </div>

          {/* Row 8: Station & Contact */}
          <div className="form-row-two">
            <div className="input-group">
              <label className="input-label">Station During Leave</label>
              <input
                type="text"
                name="station"
                value={formData.station}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Contact During Leave</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Row 9: Person In Charge & Reporting To */}
          <div className="form-row-two">
            <div className="input-group">
              <label className="input-label">Person In-Charge During Leave</label>
              <input
                type="text"
                name="personInCharge"
                value={formData.personInCharge}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Reporting To</label>
              <input
                type="text"
                name="reportingTo"
                value={formData.reportingTo}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Row 10: Reason */}
          <div className="form-row-one">
            <div className="input-group">
              <label className="input-label">Reason of Leave</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows="3"
                className="form-textarea"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="button-container">
            <button
              type="submit"
              disabled={loading}
              className={`submit-button ${loading ? 'disabled' : ''}`}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>Generating...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}