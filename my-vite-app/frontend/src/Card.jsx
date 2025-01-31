import React from 'react';

function Card({ data }) {
  return (
    <div className="flex items-center h-screen w-full justify-center bg-gray-100">
      <div className="w-96 bg-white rounded-lg shadow-xl p-6">
        <div className="bg-blue-400 text-white p-3 rounded-md text-center mb-6">
          <h2 className="text-xl font-bold">{data.institute}</h2>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          {data.profileImage ? (
            <img
              className="w-32 h-32 rounded-full object-cover mb-4"
              src={data.profileImage}
              alt={data.name}
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <h3 className="text-3xl font-semi-bold text-gray-800">{data.name}</h3>
          <p className="text-lg font-semi-bold text-gray-600 mt-1">{data.department}</p>
        </div>

        <div className="space-y-3 text-m">
          <div className="flex">
            <span className="w-10 text-black-500 font-bold">ID:</span>
            <span>{data.id}</span>
          </div>
          <div className="flex">
            <span className="w-15 text-black-700 font-bold">Phone:</span>
            <span>{data.phone}</span>
          </div>
          <div className="flex">
            <span className="w-18 text-black-500 font-bold">Address:</span>
            <span>{data.address}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <img src="https://as1.ftcdn.net/jpg/02/55/97/94/1000_F_255979498_vewTRAL5en9T0VBNQlaDBoXHlCvJzpDl.webp" alt="Barcode placeholder" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default Card;




