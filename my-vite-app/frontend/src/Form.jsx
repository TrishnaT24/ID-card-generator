import React, { useState } from 'react';

function Form({ onGenerate }) {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    department: "",
    phone: "",
    address: "",
    institute: "", // Added institute field
    profileImage: null,
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || (key === "profileImage" && formData.profileImage === null)) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onGenerate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl">Submit your Details to Generate the ID Card</h1>
            <p className="text-gray-300">All fields are required.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {["name", "id", "department", "phone", "address", "institute"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  onChange={handleChange}
                  className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
              </div>
            ))}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.profileImage && <p className="text-red-500 text-xs italic">{errors.profileImage}</p>}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className={`shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  Object.values(formData).some((value) => !value) ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={Object.values(formData).some((value) => !value)}
              >
                Generate ID Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
