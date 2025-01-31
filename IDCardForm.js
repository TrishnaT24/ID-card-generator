import { useState } from "react";

const IDCardForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    department: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={handleChange}
        className="block w-full p-2 mb-2 border"
      />
      <input
        type="text"
        name="id"
        placeholder="Enter ID"
        onChange={handleChange}
        className="block w-full p-2 mb-2 border"
      />
      <input
        type="text"
        name="department"
        placeholder="Enter Department"
        onChange={handleChange}
        className="block w-full p-2 mb-2 border"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full p-2 mb-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Generate ID Card
      </button>
    </form>
  );
};

export default IDCardForm;
