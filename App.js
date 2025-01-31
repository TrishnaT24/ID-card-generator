import React, { useState } from "react";
import "./App.css";

function App() {
  const [showCard, setShowCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    uid: "",
    bloodGroup: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCard(true);
  };

  return (
    <div className="container">
      {!showCard ? (
        <div className="form-container">
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="class"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="uid"
              placeholder="UID"
              value={formData.uid}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              required
            />
            <button type="submit">Generate ID Card</button>
          </form>
        </div>
      ) : (
        <div className="id-card-wrapper">
          <div className="card">
            <div className="card-header">
              <h3>STUDENT ID CARD</h3>
            </div>
            <div className="profile">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" />
              ) : (
                <div className="placeholder">No Image</div>
              )}
            </div>
            <div className="card-details">
              <h2>{formData.name}</h2>
              <p><strong>Class:</strong> {formData.class}</p>
              <p><strong>UID:</strong> {formData.uid}</p>
              <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>
            </div>
          </div>
          
          {/* Download and Back Buttons */}
          <button className="download-btn">Download ID Card</button>
          <button className="back-btn" onClick={() => setShowCard(false)}>Back</button>
        </div>
      )}
    </div>
  );
}

export default App;
