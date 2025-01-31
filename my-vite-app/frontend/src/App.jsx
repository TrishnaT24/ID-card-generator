import React, { useState } from 'react';
import Form from './Form';
import Card from './Card';

function App() {
  const [cardData, setCardData] = useState(null);

  // Handle form submission and store the form data in state
  const handleGenerate = (data) => {
    console.log('Generated Data:', data);
    console.log('Data Type:', typeof data);
    console.log('Data Keys:', Object.keys(data));
    setCardData(data);  // Update state with the generated ID data
  };

  return (
    <>
      {cardData ? (
        <Card data={cardData} />  // Render Card if data is available
      ) : (
        <Form onGenerate={handleGenerate} />  // Render Form if no data
      )}
    </>
  );
}

export default App;
