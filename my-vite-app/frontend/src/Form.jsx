import React, { useState } from 'react';

function Form({ onGenerate }) {
    
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
        console.log('Image Data:', reader.result);
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    console.log('Form Submitted with data:', formData); 
    e.preventDefault();
    onGenerate(formData);  // Pass the form data to the parent component
  };

  return (
    <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl">Contact Us!</h1>
            <p className="text-gray-300">
              Fill up the form below to send us a message.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter Name"
              onChange={handleChange}
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              name="id"
              value={formData.id}
              placeholder="Enter ID"
              onChange={handleChange}
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              placeholder="Enter Department"
              onChange={handleChange}
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="file"
            //   value={formData.profileImage}
              accept="image/*"
              onChange={handleImageUpload}
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
