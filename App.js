import React, { useState } from "react";
import "./App.css";

function App() {
  const [showCard, setShowCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    division: "",
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
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} required />
            <input type="text" name="division" placeholder="Division" value={formData.division} onChange={handleChange} required />
            <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} required />
            <input type="file" accept="image/*" onChange={handlePhotoUpload} required />
            <button type="submit">Generate ID Card</button>
          </form>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h3>STUDENT ID CARD</h3>
          </div>
          <div className="profile">
            {formData.photo ? <img src={formData.photo} alt="Profile" /> : <div className="placeholder">No Image</div>}
          </div>
          <div className="card-details">
            <h2>{formData.name}</h2>
            <p><strong>Branch:</strong> {formData.branch}</p>
            <p><strong>Division:</strong> {formData.division}</p>
            <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>
          </div>
          <button onClick={() => setShowCard(false)}>Go Back</button>
        </div>
      )}
    </div>
  );
}

export default App;
