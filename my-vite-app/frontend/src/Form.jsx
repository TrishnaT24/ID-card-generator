import React, { useState } from "react";
function Form({onGenerate}) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [institute, setInstitute] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress and convert to JPEG
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setProfileImage(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
        setMessage("Error processing image. Please try again.");
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!id) newErrors.id = "ID is required";
    if (!department) newErrors.department = "Department is required";
    if (!phone) newErrors.phone = "Phone is required";
    if (!address) newErrors.address = "Address is required";
    if (!institute) newErrors.institute = "Institute is required";
    if (!profileImage) newErrors.profileImage = "Profile image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = { name, id, department, phone, address, institute, profileImage };

    try {
      // http://localhost:3000/api/users
      const response = await fetch("https://id-card-generator-git-main-trishnas-projects-c72ed184.vercel.app/api/users", {
      // const response = await fetch("http://<ip where backend is hosted>:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User data successfully stored in the database!");
        onGenerate(userData);
        setName("");
        setId("");
        setDepartment("");
        setPhone("");
        setAddress("");
        setInstitute("");
        setProfileImage(null);
      } else {
        setMessage(data.message || "Failed to store user data.");
      }
    } catch (error) {
      console.error("Error storing user data:", error);
      setMessage("An error occurred while saving user data.");
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

          {message && <p className="text-center text-white bg-green-600 p-2 rounded">{message}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}

            <input
              type="text"
              name="id"
              value={id}
              placeholder="Enter ID"
              onChange={(e) => setId(e.target.value)}
              className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.id && <p className="text-red-500 text-xs italic">{errors.id}</p>}

            <input
              type="text"
              name="department"
              value={department}
              placeholder="Enter Department"
              onChange={(e) => setDepartment(e.target.value)}
              className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.department && <p className="text-red-500 text-xs italic">{errors.department}</p>}

            <input
              type="text"
              name="phone"
              value={phone}
              placeholder="Enter Phone"
              onChange={(e) => setPhone(e.target.value)}
              className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}

            <input
              type="text"
              name="address"
              value={address}
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}

            <input
              type="text"
              name="institute"
              value={institute}
              placeholder="Enter Institute"
              onChange={(e) => setInstitute(e.target.value)}
              className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.institute && <p className="text-red-500 text-xs italic">{errors.institute}</p>}

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
                  !name || !id || !department || !phone || !address || !institute || !profileImage
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!name || !id || !department || !phone || !address || !institute || !profileImage}
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
