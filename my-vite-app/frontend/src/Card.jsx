import React, { useRef, useState } from "react";
import domtoimage from 'dom-to-image';

function Card({ data }) {
  const cardRef = useRef(); // Reference for the card component
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCard = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      if (cardRef.current) {
        const dataUrl = await domtoimage.toPng(cardRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${data.name}_${Date.now()}_ID_Card.png`;
        link.click();
      }
    } catch (error) {
      console.error("Error downloading card:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center h-screen w-full justify-center bg-gray-100">
      <div ref={cardRef} className="w-96 bg-white rounded-lg shadow-xl p-6">
        {/* Institute Name */}
        <div className="bg-blue-400 text-white p-3 rounded-md text-center mb-6">
          <h2 className="text-xl font-bold">{data.institute}</h2>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          {data.profileImage ? (
            <img
              className="w-32 h-32 rounded-full object-cover mb-4"
              src={data.profileImage}
              alt={data.name}
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-400 text-lg">No Image</span>
            </div>
          )}
          <h3 className="text-3xl font-semibold text-gray-800">{data.name}</h3>
          <p className="text-lg font-semibold text-gray-600 mt-1">
            {data.department}
          </p>
        </div>

        {/* ID Details */}
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

        {/* Barcode Placeholder */}
        <div className="mt-6 flex justify-center">
          <img
            src="https://as1.ftcdn.net/jpg/02/55/97/94/1000_F_255979498_vewTRAL5en9T0VBNQlaDBoXHlCvJzpDl.webp"
            alt="Barcode placeholder"
            className="w-full"
          />
        </div>

        {/* Download Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadCard}
            className={`bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ${
              isDownloading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isDownloading ? "Downloading..." : "Download ID Card"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;