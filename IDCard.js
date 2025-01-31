const IDCard = ({ data }) => {
  if (!data.name) return null; // Hide if no data

  return (
    <div className="border p-4 shadow-lg rounded text-center mt-4">
      {data.profileImage && <img src={data.profileImage} alt="Profile" className="w-24 h-24 mx-auto rounded-full" />}
      <h2 className="text-xl font-bold">{data.name}</h2>
      <p>ID: {data.id}</p>
      <p>Department: {data.department}</p>
    </div>
  );
};

export default IDCard;
